import { Avatar, Typography } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import React from 'react'
import { quantify } from '../../helpers'
import { useStyles } from './style'

export default function ViewLikes(props) {
  const classes = useStyles()
  const { users, onClick } = props

  return (
    <div className={classes.root} onClick={onClick}>
      <AvatarGroup className={classes.avatarGroup} max={3}>
        {users.length > 0 &&
          users.map(user => (
            <Avatar alt="user image" src={user.profileImage?.url} />
          ))}
      </AvatarGroup>
      <Typography variant="body2">
        Liked by <b>{users[users.length - 1]?.username}</b>
        {`${
          users.length > 1
            ? ` and ${users.length - 1} ${quantify(users.length - 1, 'other')}`
            : ''
        }`}
      </Typography>
    </div>
  )
}
