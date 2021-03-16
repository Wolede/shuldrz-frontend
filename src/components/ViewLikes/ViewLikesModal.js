import { Avatar, Box, Typography } from '@material-ui/core'
import React from 'react'
import Link from 'next/link'

export default function ViewLikesModal({ users }) {
  return (
    <div>
      <Box marginBottom="1rem">
        <Typography variant="h6" gutterBottom>
          People who liked this
        </Typography>
      </Box>
      {users.map(user => (
        <Box marginBottom="1.5rem" display="flex">
          <Box display="flex">
            <Link href={`/app/users/${user.username}`}>
              <a style={{ textDecoration: 'none' }}>
                <Box marginRight="1rem">
                  <Avatar
                    alt={user.username}
                    src={user.profileImage ? user.profileImage.url : '/'}
                    size={'tiny'}
                  />
                </Box>
              </a>
            </Link>
          </Box>
          <Box flexGrow="1">
            <Box display="flex" alignItems="center" marginBottom=".5rem">
              <Box marginRight=".5rem">
                <Typography variant="body2">{user.username}</Typography>
              </Box>
              {/* <Typography variant='caption' color="textSecondary">
						{moment(comment.createdAt).calendar()}
					</Typography> */}
            </Box>
            <Box>
              <Typography variant="body1">{user.experience}</Typography>
            </Box>
          </Box>
          {/* <Box display="flex" justifyContent="flex-end">
				{comment.user.id === user?.id && (
					<div className={classes.iconButtons}>
						<BoxMenu
							className={classes.iconButton}
							// id={id} 
							deleteComment={deleteComment}
							comment={comment}
							anchorEl={anchorEl}
							handleClick={handleMenuClick}
							handleClose={handleMenuClose}
							view="noteComment"
						/>
					</div>
				)}
			</Box> */}
        </Box>
      ))}
    </div>
  )
}
