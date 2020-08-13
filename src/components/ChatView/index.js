import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, Fab, useMediaQuery, Button as MuiButton, IconButton, MenuItem, Menu } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import ChatInput from 'components/ChatInput'
import { useStyles } from './styles'
import Divider from 'components/Divider'
import moment from 'moment'
import MiniDrawer from 'components/MiniDrawer';
import ChatProfile from '../ChatProfile';
import Modal from 'components/Modal';
import api from 'services/Api'



const ChatView = ({ user, chat, endSessionFn, endBtn, backBtn, submitMessage, userClickedInput, volunteer }) => {
    const classes = useStyles()

    // More sidebar profile stuff 
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openRightSidebar, setOpenRightSidebar] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleRightSidebarOpen = () => {
        setOpenRightSidebar(true);
    };

    const handleRightSidebarClose = () => {
        setOpenRightSidebar(false);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    // const shouldOpenRightSidebar = isDesktop ? false : openRightSidebar;

    const deleteMessage = () => {
        console.log('MESSAGE DELETED')
    }

    const setSchedule = () => {
        console.log('schedule has been set')
        setOpenModal(true);
    }


    const endSession = () => {
        endSessionFn()

    }





    // function scrollToEnd(){
    //     var chatList = document.getElementById("chatview-container");
    //     chatList.scrollTop = chatList.scrollHeight;
    // }



    useEffect(() => {
        const container = document.getElementById('chatview-container');
        if (container)
            container.scrollTo(0, container.scrollHeight);
    })




    if (chat === undefined) {
        return (
            <div>
                Select a chat
            </div>
        )
    } else {
        return (
            <>
                {
                    <MiniDrawer
                        direction='left'
                        open={openRightSidebar}
                        width='100%'
                        position='absolute'
                    >
                        <ChatProfile
                            chatProfile={volunteer}
                            closeChatProfile={handleRightSidebarClose}
                        />
                    </MiniDrawer>
                }

                <Box
                    position='sticky'
                    top='0.1px'
                    display="flex"
                    style={{ backgroundColor: '#3f316b' }}
                    padding='0rem 0rem 1rem 0rem'
                >
                    <Box flexGrow='1' display='flex' alignItems='center'>
                        {!isDesktop && (
                            <Fab size="small" aria-label="back" color="secondary" onClick={backBtn} style={{ marginRight: '1rem' }}>
                                <ArrowBackIcon />
                            </Fab>
                        )
                        }
                        <MuiButton
                            variant="contained"
                            color="secondary"
                            size='small'
                            startIcon={
                                <Avatar
                                    className={classes.chatAvatar}
                                    alt={chat.users.filter(_user => _user !== user.username)[0]}
                                    src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null
                                        ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image :
                                        chat.users.filter(_user => _user !== user.username)[0]
                                    }
                                    size="tiny" variant='rounded' />
                            }
                            onClick={handleRightSidebarOpen}
                        >
                            More
                        </MuiButton>

                    </Box>
                    <div className={classes.headerButtons}>
                        <Button onClick={setSchedule} variant="contained" size="tiny" color="secondary-light">Set schedule</Button>
                        <Button onClick={endSession} variant="contained" size="tiny" color="error-light" disabled={endBtn()}>End session</Button>
                    </div>
                </Box>
                <Box flexGrow='1' padding='2rem 0 2rem 0' overflow="auto" id="chatview-container">

                    {
                        chat.messages.map((msg, i) => {

                            return (
                                <div key={i}>
                                    {
                                        msg.session === 'started' && (
                                            <Divider>
                                                <Typography variant="body1">Session Started</Typography>
                                            </Divider>
                                        )
                                    }

                                    {
                                        msg.message && (
                                            <div className={msg.sender === user ? classes.userSent : classes.friendSent}>
                                                <div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                                        <Typography variant="body1">{msg.message}</Typography>
                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            onClick={handleClick}
                                                            color='secondary'
                                                            style={{padding: '0 0 0 5px'}}
                                                        >
                                                            <MoreVertIcon style={{ color: '#ffffff' }} />
                                                        </IconButton>

                                                        <Menu
                                                        id="simple-menu"
                                                        anchorEl={anchorEl}
                                                        keepMounted
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleClose}
                                                        >
                                                            <MenuItem onClick={deleteMessage}>Delete message</MenuItem>                                                       
                                                        </Menu>

                                                    </div>
                                                    <Typography color="secondary" className='timestamp'>
                                                        {moment(msg.timestamp).calendar()}
                                                    </Typography>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        msg.session === 'ended' && (
                                            <Divider>

                                                <Typography variant="body1">{msg.sender == user.username ? 'You' : msg.sender} ended the session</Typography>

                                            </Divider>
                                        )
                                    }
                                </div>
                            )


                        })
                    }

                </Box>


                <ChatInput userClickedInput={userClickedInput} submitMessageFn={submitMessage} />


            </>
        )
    }


}

ChatView.propTypes = {
    backBtn: PropTypes.func,
    endBtn: PropTypes.bool
};

export default ChatView
