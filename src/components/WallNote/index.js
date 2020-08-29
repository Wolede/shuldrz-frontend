import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, ButtonBase } from '@material-ui/core'
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import Link from 'next/link'
import { useStyles } from './style';
import api from 'services/Api'
import Modal from 'components/Modal'
import Button from 'components/Button'
import FavoriteIcon from '@material-ui/icons/Favorite';
import BoxMenu from 'components/BoxMenu'
import { trigger } from 'swr'
import useAuth from 'contexts/Auth'

const WallNote = props => {
    const classes = useStyles(props)
    const { user } = useAuth();

    const {
        id,
        title,
        note,
        hearts,
        userData,
        link,
        date,
        color,
        dedication,
        urlQuery,
        modalIsOpen,
        isPublic,
        triggerUrl
    } = props

    // Modal Functions

    const [openModal, setOpenModal] = useState(urlQuery === id);
    const [openShareModal, setOpenShareModal] = useState(false);

    
    const handleOpen = () => {
        if(openModal === false) {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    // Menu Functions
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteNote = async () => {
        try {
            const res = await api.delete(`wall-notes/${id}`)
            trigger(triggerUrl, api.get)
            handleMenuClose()
        } catch (error){}
    }

    //Truncate functions
    const truncate = (string, maxLength) => {
        if (string.length > maxLength) {
            return (
                <>
                {string.substring(0, maxLength)}...
                <Typography variant='body2' className={classes.link} gutterBottom onClick={handleOpen}>
                    Read More
                </Typography>
                </>
            )
        } else {
            return string;
        }
    }

    const truncateWithoutMarkup = (string, maxLength) => {
        if (string.length > maxLength) {
            return `${string.substring(0, maxLength)}...`
        } else {
            return string;
        }
    }

    const webShare = () => {
        if(navigator.share) {
            navigator.share({
                title: `${title}`,
                text: `${title} -> ${truncateWithoutMarkup(note, 150)}`,
                url: `https://shuldrz-frontend.now.sh/wall?note=${id}`,
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

            
            <Box marginBottom='1.5rem' display='flex'>
                <Link href={isPublic ? '/login' : `/app/users/${userData.username}`}>
                <a style={{textDecoration:'none'}}>
                    <Box display='flex' alignItems='center'>
                        <Box marginRight='1rem'>
                            <Avatar
                                alt={userData.username} 
                                src={userData.profileImage ? userData.profileImage.url : '/'} 
                                size={'tiny'} 
                                />
                        </Box>
                        <Typography variant='body2'>
                            {userData.username}
                        </Typography>
                    </Box>
                </a>
                </Link>
                <Box flexGrow='1' display="flex" justifyContent="flex-end">
                    {userData.username === user.username && (
                        <div className={classes.iconButtons}>
                            <BoxMenu
                                className={classes.iconButton} 
                                id={id} 
                                deleteNote={deleteNote}
                                anchorEl={anchorEl}
                                handleClick={handleMenuClick}
                                handleClose={handleMenuClose}
                                view="wallNote"
                            />
                        </div>
                    )}
                </Box>
            </Box>
            <Typography variant='h5' gutterBottom>
                {title}
            </Typography>
            {modalIsOpen ? (
                <Typography variant='body1' gutterBottom>{note}</Typography>
            ) : (
                <Typography variant='body1' gutterBottom>
                    {truncate(note, 200)}
                </Typography>
            )}
            {dedication && (
                <a href={`https://${link}`} target='_blank'>
                    <Typography variant='caption'>
                        Dedication Link
                    </Typography>
                </a>
            )}
            <Box marginTop="auto" className={classes.buttons}>
                <Button variant='contained' size="small" color="paper" startIcon={<FavoriteIcon style={{ color: 'FD4659' }}/>}>{hearts ? hearts : '0'}</Button>
                <Button variant='outlined' size="small" onClick={webShare}>Share</Button>
            </Box>
            <Box marginTop=".5rem">
                <Typography variant='caption'>
                    {date}
                </Typography>
            </Box>

            {/* Dedication Badge  */}
            {dedication && (
                <div className={classes.dedicationBadge}>
                    <Typography variant="caption">
                        Dedication
                    </Typography>
                </div>
            )}

            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal handleClose={handleClose} openModal={openModal} view='viewNote' embedUrl={null} 
                    viewNote={{
                        id,
                        title,
                        note,
                        hearts,
                        userData,
                        link,
                        color,
                        date,
                        dedication,
                        isPublic,
                    }}
                    />
                )
            }

            {/* Load Share Modal COmponent */}
            {openShareModal === true &&
                (
                    <Modal handleClose={handleCloseShareModal} openModal={openShareModal} view='share' embedUrl={null} viewNote={{
                        id, title, note, userData
                    }}
                    />
                )
            }
        </Box>
            // </ButtonBase>
    )
}

WallNote.propTypes = {

}

export default WallNote
