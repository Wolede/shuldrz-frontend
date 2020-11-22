import React from 'react'
import PropTypes from 'prop-types'
import NoteCommentForm from 'components/Forms/NoteCommentForm'
import { Box, Typography} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Link from 'next/link'
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import moment from 'moment'
import useSWR from 'swr'
import api from 'services/Api'
import { useStyles } from './style'


const NoteComments = props => {
    const classes = useStyles()
    const { note } = props

    const triggerUrl = `/note-comments?&wall_note.id=${note.id}&_sort=createdAt:desc`
    const res = useSWR(triggerUrl, api.get, {revalidateOnFocus: true})

    const comments = res?.data?.data

    return (
        <div className={classes.root}>
            <Paper padding="1.5rem">
                <NoteCommentForm noteId={note.id} triggerUrl={triggerUrl} />
                <Box marginBottom='1.5rem'>
                    <Typography variant="h6" gutterBottom>Previous Comments</Typography>
                </Box>
                {!comments ? (
                    <Skeleton variant="rect" height={150} animation="wave"/>
                ) : comments.length === 0 ? (
                    <Typography align="center" variant="body1">No Comments Yet</Typography>
                ) : comments.map((comment, i) => (
                <Box marginBottom='1.5rem' display="flex" key={i}>
                    <Box display='flex'>
                        <Link href={`/app/users/${comment.user}`}>
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
                    <Box>
                        <Box display="flex" alignItems="center" marginBottom=".5rem">
                            <Box marginRight=".5rem">
                                <Typography variant='caption'>
                                    {comment.user.username}
                                </Typography>
                            </Box>
                            <Typography variant='caption' color="textSecondary">
                                {moment(comment.createdAt).calendar()}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1">
                                {comment.comment}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                )
                )
                }

            </Paper>
        </div>
    )
}

NoteComments.propTypes = {
    note: PropTypes.object,
}

export default NoteComments
