import { Avatar, Typography } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import React from 'react'
import { quantify } from '../../helpers'
import { useStyles } from './style'

export default function ViewLikes(props) {
  const classes = useStyles()
  const { usersLiked, onClick, user } = props

  return (
    <div className={classes.root} onClick={onClick}>
      <AvatarGroup className={classes.avatarGroup} max={3}>
        {usersLiked.length > 0 &&
          usersLiked.map(user => (
            <Avatar alt="user image" src={user.profileImage?.url} />
          ))}
      </AvatarGroup>
      <Typography variant="body2">
        {/* Liked by <b>{usersLiked[usersLiked.length - 1]?.id === user?.id ? `You` :    }</b> */}
        Liked by{' '}
        <b>
          {usersLiked.some(userLike => userLike.id === user?.id)
            ? 'You'
            : usersLiked[usersLiked.length - 1]?.username}
        </b>
        {`${
          usersLiked.length > 1
            ? ` and ${quantify(usersLiked.length - 1, 'other')}`
            : ''
        }`}
      </Typography>
    </div>
  )
}
