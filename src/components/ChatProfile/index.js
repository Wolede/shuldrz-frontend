import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Fab, Box, Typography, Container } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import GroupIcon from '@material-ui/icons/Group';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import Chip from 'components/Chip'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import useAuth from 'contexts/Auth'
import Modal from 'components/Modal'
const firebase = require("firebase/app");
import Link from 'next/link'





const ChatProfile = (props) => {
    const classes = useStyles(props)
    const { closeChatProfile, chatProfile, prevReview, view, chat } = props
    const { user, loading } = useAuth()
    const [openModal, setOpenModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [groupNameDialogOpen, setGroupNameDialog] = useState(false);
    const [sessionModal, setSessionModal] = useState(false)
    const [removeBudDialog, setRemoveBudDialog] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [removeUser, setRemoveUser] = useState('')
    
    
    

    const handleChange = (e) => {
        
        setGroupName(e.target.value)
    }

    const handleGroupNameDialogOpen = () => {
        setGroupNameDialog(true)
    }

    const handleGroupNameDialogClose = () => {
        setGroupNameDialog(false)
        setGroupName('')
    }

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleReviewClick = () => {
        setOpenModal(true);
    }    

    const handleDialogOpen = () => {
        setOpenDialog(true)
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }   

    const openRemoveDialog = (username) => {
        setRemoveBudDialog(true)
        setRemoveUser(username)        
    }

    const closeRemoveDialog = () => {
        setRemoveBudDialog(false)
    }

    const removeBudEventHandler = async () => {
        const doc = await firebase.firestore().collection('chats').doc(chat.docKey).get()
        let usersDetails = doc.data().usersDetails
        
        const newUsersDetails = usersDetails.reduce((acc, curr) => {

            if (curr.username === removeUser) {
                curr = {
                    ...curr,
                    isPresent: false
                }
            }
            acc.push(curr)
            return acc;
        }, [])

        return doc.ref.update({
            "usersDetails": firebase.firestore.FieldValue.arrayRemove({})
        })
        .then(() => {
            doc.ref.update({
                usersDetails: newUsersDetails
            })                  
            setRemoveBudDialog(false)
            setRemoveUser('')          
        })
        
    }

    const leaveGroup = async () => {
        // leave group functionality
        // console.log('group-left'); 

        const doc = await firebase.firestore().collection('chats').doc(chat.docKey).get()
        let usersDetails = doc.data().usersDetails

        const newUsersDetails = usersDetails.reduce((acc, curr) => {

            if (curr.username === user.username) {
                curr = {
                    ...curr,
                    isPresent: false
                }
            }
            acc.push(curr)
            return acc;
        }, [])
        
        // console.log('NEW USERS DETAILS', newUsersDetails)
        return doc.ref.update({
            "usersDetails": firebase.firestore.FieldValue.arrayRemove({})
        })
            .then(() => {
                doc.ref.update({
                    usersDetails: newUsersDetails
                })
                handleDialogClose()
                closeChatProfile()
            }).then(() => {
                doc.ref.update({
                    messages: firebase.firestore.FieldValue.arrayUnion({
                        sender: user.username,
                        present: false,
                        timestamp: Date.now()
                    }),
                })
            })
    }
        

    const saveGroupName = async () => {
        const doc = await firebase.firestore().collection('chats').doc(chat.docKey).get()
        console.log('GROUP NAME TEXT', groupName)
        return doc.ref.update({
            groupName: {
                title: groupName,
                updated: true
            }
        })
        .then(() => {
            handleGroupNameDialogClose()            
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const openSessionModal = () => {
        setSessionModal(true)
    }

    const closeSessionModal = () => {
        setSessionModal(false)
    }

    useEffect(() => {  
        
        view === "groupChat" && chat.groupName.updated ? 
            setGroupName(chat.groupName.title)
        :
        //set groupName with individuals username
        setGroupName(chat.usersDetails.filter(det => det.isPresent).map(usr => usr.username).join(', '))        
    }, [])

    // useEffect(() => {
    //     console.log('hey')
        
    // }, [groupName])

    const getActivePeople = () => {
        console.log('ACTIVE PEOPLE', chat?.usersDetails.filter(det => det.isPresent))
        let people = chat?.usersDetails.filter(det => det.isPresent)

        const users = people.reduce((acc, curr) => {            
            if (curr.username !== user.username) {
                acc.push({
                    userId: curr.userId, 
                    username: curr.username, 
                    image: curr?.image ? curr?.image : null,
                    isAdmin: curr.isAdmin,
                    isPresent: curr.isPresent,
                    hasDeletedChat: curr.hasDeletedChat              
                });
            }
            return acc; 
        }, [])

        return users
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

                {view === "singleChat" && (
                    <Box margin="0 auto" maxWidth="300" textAlign='center'>
                        <Link href={`/app/users/${chatProfile.username}`}>
                            <a style={{ textDecoration: 'none' }}>
                                <Avatar
                                    alt={chatProfile.firstName}
                                    src={chatProfile.profileImage ? chatProfile.profileImage.url : null}
                                    size="large"
                                    margin="1.5rem auto"
                                >{!chatProfile.profileImage ? chatProfile.firstName.substring(0, 1) : null}</Avatar>
                            </a>
                        </Link>

                        <Typography variant="h4" className={classes.text}>{chatProfile.firstName} {chatProfile.lastName}</Typography>

                        <Typography variant="body1" className={classes.text}>{chatProfile.occupation ? chatProfile.occupation : 'Occupation not set'}</Typography>

                        <Box display="flex" justifyContent="center" flexWrap="wrap" marginTop="1.5rem">
                            <Chip label={chatProfile.ranking ? chatProfile.ranking.name : 'Bronze'} rank={chatProfile.ranking ? chatProfile.ranking.colourCode : '#cd7f32'} color="paper" />

                            <Chip label={chatProfile.heart ? chatProfile.heart.count.toString() : 'No hearts yet'} heart color="paper" />
                        </Box>

                        <Button variant="contained" size="small" color="primary" marginTop='1.5rem' onClick={handleReviewClick}>Leave a review</Button>

                    </Box>
                )}


                {view === "groupChat" && (
                    
                    <Box margin="0 auto" maxWidth="300" textAlign='center'>
                        <Avatar
                            alt="group"
                            // src={chatProfile.profileImage ? chatProfile.profileImage.url : '/empty'} 
                            size="small"
                            margin="1.5rem auto"
                        >
                            <GroupIcon />
                        </Avatar>

                        <Box display="flex" justifyContent="center">
                            <Typography variant="h4" gutterBottom>
                                {
                                    chat.groupName.updated ? 
                                    chat.groupName.title
                                    :
                                    chat.usersDetails.filter(det => det.isPresent).map(usr => usr.username).join(', ')                                
                                }         
                            </Typography>                   
                            {
                                chat?.usersDetails?.find(det => det.isAdmin)?.userId === user._id 
                                ?
                                <EditIcon fontSize="large" className={classes.icon} onClick={handleGroupNameDialogOpen}/>
                                :
                                null 
                            }
                            
                        </Box>
                            {
                                chat?.usersDetails?.find(det => det.isAdmin)?.userId === user._id  ?
                                <Box>
                                    <Button 
                                    variant="contained" 
                                    size="small" 
                                    color="primary" 
                                    marginTop='1.5rem' 
                                    disabled={chat?.usersDetails?.filter(det => det.isPresent).length >= 5}
                                    onClick={openSessionModal}>
                                    Add people
                                    </Button>
                                </Box>
                                : null
                            }
                        
                        {/* Button to edit Title */}
                        {/* <Button variant="contained" size="tiny" color='secondary-light'>Edit Title</Button> */}
                        <Box margin="2rem 0 2rem 0">
                            <Typography variant="h5" align="left">People</Typography>
                            {/* map through users here */}
                            {chat.usersDetails.filter(det => det.isPresent).sort((a, b) => b.isAdmin - a.isAdmin).map(({ image, userId, isAdmin, username }, key) => (
                                <Box marginTop="1rem" key={key}>
                                    <Paper padding="0" borderRadius="1rem">
                                        <Box padding=".5rem" display="flex" alignItems="center">
                                            <Box marginRight="1rem">
                                                <Avatar
                                                    alt="group"
                                                    src={image ? image : null}
                                                    size="tiny"
                                                    margin="auto"
                                                >{!image ? username.substring(0, 1) : null}</Avatar>
                                            </Box>
                                            <Typography variant="subtitle1">{username}</Typography>
                                            
                                            {/* Chip is for only admin  */}
                                            {isAdmin  ?
                                                <Chip label="admin" color="primary" size="small" margin="0 0 0 auto" />
                                                : 
                                                <Box onClick={() => openRemoveDialog(username)} margin="0 0 0 auto" >
                                                    <Chip 
                                                    label="remove" 
                                                    color="error" 
                                                    size="small" 
                                                    />
                                                </Box>
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

            {/* Load Custom Dialog COmponent */}
            {groupNameDialogOpen === true &&
                (
                    <Dialog
                        groupNameDialogClose={handleGroupNameDialogClose}
                        openDialog={groupNameDialogOpen}
                        disableEscape={false}
                        view="editGroup"
                        value={groupName.text}
                        save={saveGroupName}
                        handleChange={handleChange}
                        isAdmin={chat?.usersDetails?.find(det => det.isAdmin)?.userId === user._id} // if user is an admin of the group
                    />
                )
            }

            {/* Load Custom Dialog COmponent */}
            {removeBudDialog === true &&
                (
                    <Dialog
                        onClose={closeRemoveDialog}
                        openDialog={removeBudDialog}
                        disableEscape={false}
                        view="removeBud"
                        bud={removeUser}
                        onSave={removeBudEventHandler}                        
                    />
                )
            }

            {/* Load Custom Modal COmponent */}
            {sessionModal === true &&
                (
                    <Modal handleClose={closeSessionModal} openModal={sessionModal} view='updateSession'  people={getActivePeople()} chat={chat}/>
                )
            }
        </div>
    )
}

ChatProfile.propTypes = {
    closeChatProfile: PropTypes.func
}

export default ChatProfile
