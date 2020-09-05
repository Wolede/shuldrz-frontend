import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Fab, Box, Typography, Container } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import Chip from 'components/Chip'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import useAuth from 'contexts/Auth'
import Modal from 'components/Modal'
const firebase = require("firebase/app");


const ChatProfile = (props) => {
    const classes = useStyles(props)
    const { closeChatProfile, chatProfile, prevReview, view, chat } = props
    const { user, loading } = useAuth()

    const [openModal, setOpenModal] = useState(false);
    

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleReviewClick = () => {
        setOpenModal(true);
    }

    const [openDialog, setOpenDialog] = useState(false);
    
    const handleDialogOpen = () => {
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const leaveGroup = async () => {
        // leave group functionality
        console.log('group-left'); 

        const doc = await firebase.firestore().collection('chats').doc(chat.docKey).get()
        let usersDetails = doc.data().usersDetails
        console.log('USERS DETAILS', usersDetails)

        const newUsersDetails = usersDetails.reduce( (acc, curr) => {
            
            if ( curr.username === user.username ) {
                curr = {
                    ...curr,
                    isPresent: false
                }
            }
            acc.push(curr)
            return acc;
        }, [])

        console.log('NEW USERS DETAILS', newUsersDetails)
        return doc.ref.update({
            "usersDetails": firebase.firestore.FieldValue.arrayRemove({})
        })
        .then(() => {
            doc.ref.update({
                usersDetails: newUsersDetails
            })
        })       

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
                    >
                        <GroupIcon/>
                    </Avatar>

                    <Typography variant="h4" className={classes.text} gutterBottom>{ chat.groupName }</Typography>

                    {/* Button to edit Title */}
                    {/* <Button variant="contained" size="tiny" color='secondary-light'>Edit Title</Button> */}

                    <Box margin="2rem 0 2rem 0">
                        <Typography variant="h5" align="left">People</Typography>

                        {/* map through users here */}
                        {chat.usersDetails.sort((a,b) => b.isAdmin - a.isAdmin ).map(({image, userId, isAdmin, username}) => (
                            <Box marginTop="1rem">
                                <Paper padding="0" borderRadius="1rem">
                                    <Box padding=".5rem" display="flex" alignItems="center">
                                        <Box marginRight="1rem">
                                            <Avatar 
                                                alt="group" 
                                                src={image ? image : '/empty'} 
                                                size="tiny"                         
                                                margin="auto" 
                                            />
                                        </Box>
                                        <Typography variant="subtitle1">{username}</Typography>

                                        {/* Chip is for only admin  */}
                                        {isAdmin &&
                                            <Chip label="admin" color="primary" size="small" margin="0 0 0 auto"/>
                                        }
                                    </Box>
                                </Paper>
                            </Box>
                        )) 

                        }

                    </Box>
                    <Button variant="contained" size="small" color="error-light" onClick={handleDialogOpen}>
                        {chat?.usersDetails?.find(det => det.isAdmin)?.userId === user._id ? 'Disable Group and Leave' : 'Leave Group'}
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
                        isAdmin={chat?.usersDetails?.find(det => det.isAdmin)?.userId === user._id} // if user is an admin of the group
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
