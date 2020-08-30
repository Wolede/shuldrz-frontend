import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Fab, Box, Typography, Container } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import Chip from 'components/Chip'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import useAuth from 'contexts/Auth'
import Modal from 'components/Modal'


const ChatProfile = (props) => {
    const classes = useStyles(props)
    const { closeChatProfile, chatProfile, prevReview, view } = props
    const { user, loading } = useAuth()

    const [openModal, setOpenModal] = useState(false);
    

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleReviewClick = () => {
        setOpenModal(true);
    }

    // if user is the admin of the group
    const isAdmin = true

    const [openDialog, setOpenDialog] = useState(false);
    
    const handleDialogOpen = () => {
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const leaveGroup = () => {
        // leave group functionality
        console.log('group-left');
        handleDialogClose()
    }


    return (
        <div className={classes.root}>
            <Box 
                position='sticky'
                top='0.1px'
                display="flex"
                padding='0rem 2rem 1rem 2rem'
            >
                <Box flexGrow='1' display='flex' alignItems='center'>
                <Fab size="small" aria-label="back" color='secondary' onClick={closeChatProfile} style={{ marginRight: '1rem', backgroundColor: 'rgb(253, 70, 89)' }}>
                    <CloseIcon />
                </Fab>
                </Box>
            </Box>
            
            <Container maxWidth="sm">

            { view === "singleChat" && (
                <Box margin="0 auto" maxWidth="300" textAlign='center'>
                    <Avatar 
                            alt={chatProfile.firstName} 
                            src={chatProfile.profileImage ? chatProfile.profileImage.url : '/empty'} 
                            size="large"                         
                            // autoWidth
                            margin="1.5rem auto" 
                    />

                    <Typography variant="h4" className={classes.text}>{chatProfile.firstName} {chatProfile.lastName}</Typography>

                    <Typography variant="body1" className={classes.text}>{chatProfile.occupation ? chatProfile.occupation : 'Occupation not set'}</Typography>

                    <Box display="flex" justifyContent="center" flexWrap="wrap" marginTop="1.5rem">
                        <Chip label={chatProfile.ranking ? chatProfile.ranking.name : 'Bronze'} rank={chatProfile.ranking ? chatProfile.ranking.colourCode : '#cd7f32'} color="paper"/>

                        <Chip label={chatProfile.heart ? chatProfile.heart.count.toString() : 'No hearts yet'} heart color="paper"/>
                    </Box>

                    <Button variant="contained" size="small" color="primary" marginTop='1.5rem'  onClick={handleReviewClick}>Leave a review</Button>

                </Box>
            )}


            { view === "groupChat" && (
                <Box margin="0 auto" maxWidth="300" textAlign='center'>
                    <Avatar 
                        alt="group" 
                        // src={chatProfile.profileImage ? chatProfile.profileImage.url : '/empty'} 
                        size="small"                         
                        margin="1.5rem auto" 
                    />

                    <Typography variant="h4" className={classes.text} gutterBottom>Group Title</Typography>

                    {/* Button to edit Title */}
                    {/* <Button variant="contained" size="tiny" color='secondary-light'>Edit Title</Button> */}

                    <Box margin="2rem 0 2rem 0">
                        <Typography variant="h5" align="left">People</Typography>

                        {/* map through users here */}
                        <Box marginTop="1rem">
                            <Paper padding="0" borderRadius="1rem">
                                <Box padding=".5rem" display="flex" alignItems="center">
                                    <Box marginRight="1rem">
                                        <Avatar 
                                            alt="group" 
                                            // src={chatProfile.profileImage ? chatProfile.profileImage.url : '/empty'} 
                                            size="tiny"                         
                                            margin="auto" 
                                        />
                                    </Box>
                                    <Typography variant="subtitle1">Username</Typography>

                                    {/* CHip is for only admin  */}
                                    <Chip label="admin" color="primary" size="small" margin="0 0 0 auto"/>
                                </Box>
                            </Paper>
                        </Box>

                    </Box>
                    <Button variant="contained" size="small" color="error-light" onClick={handleDialogOpen}>
                        {isAdmin ? 'Disable Group and Leave' : 'Leave Group'}
                    </Button>
                </Box>
            )}

            </Container>

            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal chatProfile={chatProfile} handleClose={handleClose} openModal={openModal} view='review' embedUrl={null} prevReview={prevReview} />
                )
            }

            {/* Load Custom Dialog COmponent */}
            {openDialog === true &&
                (
                    <Dialog 
                        handleClose={handleDialogClose} 
                        openDialog={openDialog} 
                        disableEscape={false} 
                        view="leaveGroup"
                        leaveGroup={leaveGroup}
                        isAdmin={isAdmin} // if user is an admin of the group
                    />
                )
            }


        </div>
    )
}

ChatProfile.propTypes = {
    closeChatProfile: PropTypes.func
}

export default ChatProfile
