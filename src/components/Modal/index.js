import { Box, Container, Modal as MuiModal } from '@material-ui/core'
import Paper from 'components/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import AddJournalForm from '../Forms/AddJournalForm'
import AddNoteForm from '../Forms/AddNoteForm'
import AddSessionsForm from '../Forms/AddSessionsForm'
import UpdateSessionsForm from '../Forms/UpdateSessionsForm'
import AddTopicsForm from '../Forms/AddTopicsForm'
import ForgotPasswordForm from '../Forms/ForgotPasswordForm'
import ReviewForm from '../Forms/ReviewForm'
import ScheduleForm from '../Forms/ScheduleForm'
import WallNote from '../WallNote'
import NoteComments from '../NoteComments'
import Share from '../Share'
import { useStyles } from './style'
import ViewLikesModal from 'components/ViewLikes/ViewLikesModal'

const Modal = props => {
  const classes = useStyles()
  const {
    view,
    embedUrl,
    openModal,
    handleClose,
    disableBackdropClick,
    callback,
    formProps,
    viewNote,
    pageLimit,
    triggerUrl,
    callbacks,
    people,
    chat,
  } = props

  console.log('PEOPLE', people)

  return (
    <MuiModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={openModal}
      onClose={handleClose}
      disableBackdropClick={disableBackdropClick}
      className={classes.root}
    >
      <Container
        maxWidth={view === 'video' ? 'md' : 'sm'}
        style={{ outline: 0 }}
      >
        <Box marginTop="8rem">
          {view === 'video' && (
            <div className={classes.embedContainer}>
              <iframe
                width="560"
                height="315"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="modalFrame"
              ></iframe>
            </div>
          )}

          {view === 'writeJournal' && (
            <Paper padding="1.5rem">
              <AddJournalForm
                onClose={handleClose}
                pageLimit={pageLimit}
                prevJournal={props.prevJournal}
              />
            </Paper>
          )}
          {view === 'review' && (
            <Paper>
              <ReviewForm
                chatProfile={props.chatProfile}
                prevReview={props.prevReview}
              />
            </Paper>
          )}
          {view === 'forgotPassword' && (
            <Paper padding="1.5rem">
              <ForgotPasswordForm onClose={handleClose} />
            </Paper>
          )}

          {view === 'addInterestedTopics' && (
            <Paper padding="1.5rem">
              <AddTopicsForm
                onClose={handleClose}
                getSuggestedBuddies={callback}
              />
            </Paper>
          )}

          {view === 'addSessions' && (
            <Paper padding="1.5rem">
              <AddSessionsForm
                onClose={handleClose}
                submitNewChat={callbacks.submitNewChat}
                updateSelectedChat={callbacks.updateSelectedChat}
              />
            </Paper>
          )}

          {view === 'updateSession' && (
            <Paper padding="1.5rem">
              <UpdateSessionsForm
                onClose={handleClose}
                people={people}
                chat={chat}
              />
            </Paper>
          )}

          {view === 'schedule' && (
            <Paper padding="1.5rem">
              <ScheduleForm onClose={handleClose} formProps={formProps} />
            </Paper>
          )}
          {view === 'share' && (
            <Paper padding="1.5rem">
              <Share note={viewNote} />
            </Paper>
          )}
          {view === 'writeNote' && (
            <Paper padding="1.5rem">
              <AddNoteForm
                onClose={handleClose}
                triggerUrl={triggerUrl}
                prevNote={props.prevNote}
              />
            </Paper>
          )}
          {view === 'viewNote' && (
            <div>
              <WallNote
                modalIsOpen={true}
                id={viewNote.id}
                title={viewNote.title}
                note={viewNote.note}
                hearts={viewNote.hearts}
                color={viewNote.color}
                link={viewNote.link}
                usersLiked={viewNote.usersLiked}
                noteComments={viewNote.noteComments}
                date={viewNote.date}
                dedication={viewNote.dedication}
                userData={viewNote.userData}
                urlQuery={false}
                isPublic={viewNote.isPublic}
                triggerUrl={viewNote.triggerUrl}
              />
            </div>
          )}
          {view === 'noteComments' && (
            <NoteComments
              note={props.note}
              comments={props.comments}
              triggerUrl={props.triggerUrl}
            />
          )}
          {view === 'viewNoteLikes' && (
            <Paper padding="1.5rem">
              <ViewLikesModal users={props.likedBy} />
            </Paper>
          )}
        </Box>
      </Container>
    </MuiModal>
  )
}

Modal.propTypes = {
  openModal: PropTypes.bool,
  handleClose: PropTypes.func,
  disableBackdropClick: PropTypes.bool,
  view: PropTypes.string,
  embedUrl: PropTypes.string,
  user: PropTypes.object,
  viewNote: PropTypes.object,
  prevNote: PropTypes.object,
  prevJournal: PropTypes.object,
  note: PropTypes.object,
  comments: PropTypes.array,
  likedBy: PropTypes.array,
}

export default Modal
