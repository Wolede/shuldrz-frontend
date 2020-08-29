import React from 'react'
import PropTypes from 'prop-types'
import { Modal as MuiModal, Container, Box } from '@material-ui/core'
import { useStyles } from './style'
import Paper from 'components/Paper'
import AddJournalForm from '../Forms/AddJournalForm'
import AddNoteForm from '../Forms/AddNoteForm'
import ReviewForm from '../Forms/ReviewForm'
import ForgotPasswordForm from '../Forms/ForgotPasswordForm'
import AddTopicsForm from '../Forms/AddTopicsForm'
import ScheduleForm from '../Forms/ScheduleForm'
import WallNote from '../WallNote'
import Share from '../Share'
import AddSessionsForm from '../Forms/AddSessionsForm'

const Modal = props => {
    const classes = useStyles()
    const { view, embedUrl, openModal, handleClose, disableBackdropClick, callback, formProps, viewNote, pageLimit, triggerUrl } = props

    return (
        <MuiModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleClose}
        disableBackdropClick={disableBackdropClick}
        >
            <Container maxWidth={view === 'video' ? 'md' : 'sm'} style={{ outline: 0 }} >
                <Box marginTop="8rem">
                { view === "video" && 
                    (
                        <div className={classes.embedContainer}>
                            <iframe width="560" height="315" src={embedUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="modalFrame"></iframe>
                        </div> 
                    )                            
                }

                { view === "writeJournal" &&
                    (
                        <Paper padding="1.5rem">
                            <AddJournalForm onClose={handleClose} pageLimit={pageLimit} />
                        </Paper>
                    )
                }
                {
                    view === 'review' && (
                        <Paper>
                            <ReviewForm chatProfile={props.chatProfile} prevReview={props.prevReview}/>
                        </Paper>
                    )
                }
                { view === "forgotPassword" &&
                    (
                        <Paper padding="1.5rem">
                            <ForgotPasswordForm onClose={handleClose} />
                        </Paper>
                    )
                }

                { view === "addInterestedTopics" &&
                    (
                        <Paper padding="1.5rem">
                            <AddTopicsForm onClose={handleClose} getSuggestedBuddies={callback}/>
                        </Paper>
                    )
                }

                { view === "addSessions" &&
                    (
                        <Paper padding="1.5rem">
                            <AddSessionsForm onClose={handleClose} />
                        </Paper>
                    )
                }
                { view === "schedule" &&
                    (
                        <Paper padding="1.5rem">
                            <ScheduleForm onClose={handleClose} formProps={formProps}/>
                        </Paper>
                    )
                }
                { view === "share" &&
                    (
                        <Paper padding="1.5rem">
                            <Share note={viewNote}/>
                        </Paper>
                    )
                }
                { view === "writeNote" &&
                    (
                        <Paper padding="1.5rem">
                            <AddNoteForm onClose={handleClose} triggerUrl={triggerUrl}/>
                        </Paper>
                    )
                }
                { view === "viewNote" &&
                    (
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
                                date={viewNote.date}
                                dedication={viewNote.dedication}
                                userData={viewNote.userData}
                                urlQuery={false}
                                isPublic={viewNote.isPublic}
                                triggerUrl={viewNote.triggerUrl}
                            />
                        </div>
                    )
                }
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
}

export default Modal
