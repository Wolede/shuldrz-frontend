import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, ButtonBase } from '@material-ui/core'
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import Link from 'next/link'
import { useStyles } from './style'
import api from 'services/Api'
import Modal from 'components/Modal'
import Button from 'components/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import CommentIcon from '@material-ui/icons/Comment'
import BoxMenu from 'components/BoxMenu'
import { trigger } from 'swr'
import useAuth from 'contexts/Auth'
import ViewLikes from 'components/ViewLikes'

const WallNote = props => {
  const classes = useStyles(props)
  const { user } = useAuth()

  const {
    id,
    title,
    note,
    hearts,
    userData,
    link,
    usersLiked,
    date,
    color,
    dedication,
    noteComments,
    urlQuery,
    modalIsOpen,
    isPublic,
    triggerUrl,
  } = props

  // Modal Functions

  const [openModal, setOpenModal] = useState(urlQuery === id)
  const [openShareModal, setOpenShareModal] = useState(false)
  const [openCommentsModal, setOpenCommentsModal] = useState(false)
  const [openViewLikesModal, setOpenViewLikesModal] = useState(false)

  const handleOpen = () => {
    if (openModal === false) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleCommentsOpen = () => {
    setOpenCommentsModal(true)
  }

  const handleCommentsClose = () => {
    setOpenCommentsModal(false)
  }

  const handleViewLikesClose = () => {
    setOpenViewLikesModal(false)
  }

  // Like/Heart functions
  const [likes, setLikes] = useState({
    userHasLiked: false,
    count: usersLiked.length,
    loading: true,
  })

  const like = async () => {
    setLikes({ ...likes, loading: true })
    try {
      const res = await api.put(`wall-notes/${id}`, {
        usersLiked: [...usersLiked, user?.id],
      })
      trigger(triggerUrl, api.get)
      setLikes({
        userHasLiked: true,
        count: usersLiked.length + 1,
        loading: false,
      })
    } catch (error) {}
  }

  const unlike = async () => {
    setLikes({ ...likes, loading: true })
    const newUsersLiked = usersLiked.filter(item => item.id !== user?.id)
    console.log('gbagaun', newUsersLiked)

    try {
      const res = await api.put(`wall-notes/${id}`, {
        usersLiked: newUsersLiked,
      })
      trigger(triggerUrl, api.get)
      setLikes({
        userHasLiked: false,
        count: newUsersLiked.length,
        loading: false,
      })
    } catch (error) {}
  }

  const getLikeStatus = () => {
    if (!isPublic) {
      setLikes({
        userHasLiked: usersLiked.some(curr => curr.username === user?.username),
        count: usersLiked.length,
      })
    }
  }

  useEffect(() => {
    getLikeStatus()
  }, [])

  // Menu Functions
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const deleteNote = async () => {
    try {
      const res = await api.delete(`wall-notes/${id}`)
      trigger(triggerUrl, api.get)
      handleMenuClose()
    } catch (error) {}
  }

  //Truncate functions
  const truncate = (string, maxLength) => {
    if (string.length > maxLength) {
      return (
        <>
          {string.substring(0, maxLength)}...
          <Box marginTop=".5rem">
            <Typography
              variant="body2"
              className={classes.link}
              gutterBottom
              onClick={handleOpen}
            >
              Read More
            </Typography>
          </Box>
        </>
      )
    } else {
      return string
    }
  }

  const truncateWithoutMarkup = (string, maxLength) => {
    if (string.length > maxLength) {
      return `${string.substring(0, maxLength)}...`
    } else {
      return string
    }
  }

  const webShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${title}`,
        text: `${title} -> ${truncateWithoutMarkup(note, 150)}`,
        url: `https://shuldrz.com/wall?note=${id}`,
      })
    } else {
      setOpenShareModal(true)
    }
  }

  const handleCloseShareModal = () => {
    setOpenShareModal(false)
  }

  return (
    // <ButtonBase
    //     focusRipple={modalIsOpen}
    //     className={classes.buttonBase}
    //     focusVisibleClassName={classes.buttonBaseVisible}
    //     onClick={handleOpen}
    //     style={{
    //         borderRadius: '1.875rem',
    //     }}
    // >
    <Box className={classes.root}>
      <Box marginBottom="1.5rem" display="flex">
        <Link href={isPublic ? '/login' : `/app/users/${userData.username}`}>
          <a style={{ textDecoration: 'none' }}>
            <Box display="flex" alignItems="center">
              <Box marginRight="1rem">
                <Avatar
                  alt={userData.username}
                  src={userData.profileImage ? userData.profileImage.url : '/'}
                  size={'tiny'}
                />
              </Box>
              <Typography variant="body2">{userData.username}</Typography>
            </Box>
          </a>
        </Link>
        <Box flexGrow="1" display="flex" justifyContent="flex-end">
          {!isPublic && userData.username === user?.username && (
            <div className={classes.iconButtons}>
              <BoxMenu
                className={classes.iconButton}
                id={id}
                deleteNote={deleteNote}
                note={props}
                anchorEl={anchorEl}
                handleClick={handleMenuClick}
                handleClose={handleMenuClose}
                view="wallNote"
              />
            </div>
          )}
        </Box>
      </Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {modalIsOpen ? (
        <Typography variant="body1" gutterBottom>
          {note}
        </Typography>
      ) : (
        <Typography variant="body1" gutterBottom>
          {truncate(note, 200)}
        </Typography>
      )}
      {dedication && link && (
        <a href={`https://${link}`} target="_blank">
          <Typography variant="caption">Dedication Link</Typography>
        </a>
      )}
      <Box marginTop="auto" className={classes.buttons}>
        {isPublic ? (
          <Link href={'/login'}>
            <a style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="small"
                color="paper"
                startIcon={<FavoriteBorderOutlinedIcon />}
              >
                {likes.count}
              </Button>
            </a>
          </Link>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="paper"
            startIcon={
              likes.userHasLiked ? (
                <FavoriteIcon style={{ color: 'FD4659' }} />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )
            }
            loading={likes.loading}
            onClick={likes.userHasLiked ? unlike : like}
          >
            {likes.count}
          </Button>
        )}
        {/* share button */}
        <Button variant="outlined" size="small" onClick={webShare}>
          Share
        </Button>

        {/* View Likes */}
        {usersLiked.length > 0 && (
          <ViewLikes
            onClick={() => setOpenViewLikesModal(true)}
            usersLiked={usersLiked}
            user={user}
          />
        )}

        {/* comment button */}
        <div className={classes.commentButton}>
          <Button
            variant="contained"
            size="small"
            color="paper"
            startIcon={<CommentIcon />}
            disabled={isPublic}
            onClick={handleCommentsOpen}
          >
            {noteComments.length > 0 ? noteComments.length : ''} Comment
            {noteComments.length > 1 ? 's' : ''}
          </Button>
        </div>
      </Box>
      <Box marginTop=".5rem">
        <Typography variant="caption">{date}</Typography>
      </Box>

      {/* Dedication Badge  */}
      {dedication && (
        <div className={classes.dedicationBadge}>
          <Typography variant="caption">Dedication</Typography>
        </div>
      )}

      {/* Load Custom Modal COmponent */}
      {openModal === true && (
        <Modal
          handleClose={handleClose}
          openModal={openModal}
          view="viewNote"
          embedUrl={null}
          viewNote={{
            id,
            title,
            note,
            hearts,
            userData,
            link,
            usersLiked,
            noteComments,
            color,
            date,
            dedication,
            isPublic,
            triggerUrl,
          }}
        />
      )}

      {/* Load Share Modal COmponent */}
      {openShareModal === true && (
        <Modal
          handleClose={handleCloseShareModal}
          openModal={openShareModal}
          view="share"
          embedUrl={null}
          viewNote={{
            id,
            title,
            note,
            userData,
          }}
        />
      )}

      {/* Load Comments Modal COmponent */}
      {openCommentsModal === true && (
        <Modal
          handleClose={handleCommentsClose}
          openModal={openCommentsModal}
          view="noteComments"
          note={{ id, userData }}
          comments={noteComments}
          triggerUrl={triggerUrl}
        />
      )}

      {/* Load Comments Modal COmponent */}
      {openViewLikesModal === true && (
        <Modal
          handleClose={handleViewLikesClose}
          openModal={openViewLikesModal}
          view="viewNoteLikes"
          likedBy={usersLiked}
        />
      )}
    </Box>
    // </ButtonBase>
  )
}

WallNote.propTypes = {}

export default WallNote
