import React from 'react'
import PropTypes from 'prop-types'
import { Modal as MuiModal, Container, Box } from '@material-ui/core'
import { useStyles } from './style'
import Paper from 'components/Paper'
import AddJournalForm from '../Forms/AddJournalForm'
import ReviewForm from '../Forms/ReviewForm'
import ForgotPasswordForm from '../Forms/ForgotPasswordForm'
import AddTopicsForm from '../Forms/AddTopicsForm'

const Modal = props => {
    const classes = useStyles()
    const { view, embedUrl, openModal, handleClose, disableBackdropClick, callback } = props

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
                            <AddJournalForm onClose={handleClose} />
                        </Paper>
                    )
                }
                {
                    view === 'review' && (
                        <Paper>
                            <ReviewForm chatProfile={props.chatProfile}/>
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
}

export default Modal
