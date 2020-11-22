import React, {useState} from 'react'
import { Box, Typography} from '@material-ui/core'
import Link from 'next/link'
import Avatar from 'components/Avatar'
import moment from 'moment'
import BoxMenu from 'components/BoxMenu'
import { useStyles } from './style'
import api from 'services/Api'
import { trigger } from 'swr'

const NoteComment = ({comment, triggerUrl}) => {
    const classes = useStyles()

    // Menu Functions
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteComment = async () => {
        console.log('lol');
        try {
            const res = await api.delete(`note-comments/${comment.id}`)
            trigger(triggerUrl, api.get)
            handleMenuClose()
        } catch (error){
            console.log(error);
        }
    }

    return (
        <Box marginBottom='1.5rem' display="flex">
            <Box display='flex'>
                <Link href={`/app/users/${comment.user.username}`}>
                <a style={{textDecoration:'none'}}>
                    <Box marginRight='1rem'>
                        <Avatar
                            alt={comment.user.username} 
                            src={comment.user.profileImage ? comment.user.profileImage.url : '/'} 
                            size={'tiny'} 
                            />
                    </Box>
                </a>
                </Link>
            </Box>
            <Box flexGrow='1'>
                <Box display="flex" alignItems="center" marginBottom=".5rem">
                    <Box marginRight=".5rem">
                        <Typography variant='body2'>
                            {comment.user.username}
                        </Typography>
                    </Box>
                    <Typography variant='caption' color="textSecondary">
                        {moment(comment.createdAt).calendar()}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body1" className={classes.comment}>
                        {comment.comment}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" justifyContent="flex-end">
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
            </Box>
        </Box>
    )
}

export default NoteComment
