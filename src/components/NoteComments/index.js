import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NoteCommentForm from 'components/Forms/NoteCommentForm'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Paper from 'components/Paper'
import useSWR, { trigger } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import NoteComment from './NoteComment'

const NoteComments = props => {
  const classes = useStyles()
  const { note } = props

  const triggerUrl = `/note-comments?&wall_note.id=${note.id}&_sort=createdAt:desc`
  const res = useSWR(triggerUrl, api.get, { revalidateOnFocus: true })

  const comments = res?.data?.data

  return (
    <div className={classes.root}>
      <Paper padding="1.5rem">
        <NoteCommentForm noteId={note.id} triggerUrl={triggerUrl} />
        <Box marginBottom="1.5rem">
          <Typography variant="h6" gutterBottom>
            Previous Comments
          </Typography>
        </Box>
        {!comments ? (
          <Skeleton variant="rect" height={150} animation="wave" />
        ) : comments.length === 0 ? (
          <Typography align="center" variant="body1">
            No Comments Yet
          </Typography>
        ) : (
          comments.map((comment, i) => (
            <NoteComment key={i} comment={comment} triggerUrl={triggerUrl} />
          ))
        )}
      </Paper>
    </div>
  )
}

NoteComments.propTypes = {
  note: PropTypes.object,
}

export default NoteComments
