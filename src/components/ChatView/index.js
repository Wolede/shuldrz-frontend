import { Grid, Typography, Box } from '@material-ui/core'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import ChatInput from 'components/ChatInput'
import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import Divider from 'components/Divider'
import moment from 'moment'


const ChatView = ({ user, chat, endSessionFn, endBtn, submitMessage }) => {
    const classes = useStyles()

    const setSchedule = () => {
        console.log('schedule has been set')
    }

    const startSession = () => {
        console.log('session has started')
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
        if(container)
        container.scrollTo(0, container.scrollHeight);
    })
   

    if (chat === undefined) {
        return (
            <div>
                Select a chat
            </div>
        )
    } else {
        console.log(chat)
        return (
            <>

                <Box 
                    position='sticky'
                    top='0.1px'
                    display="flex"
                    style={{ backgroundColor: '#3f316b' }}
                    padding='2rem 2rem 1rem 2rem'
                >
                    <Box flexGrow='1' display='flex'>
                        <Avatar className={classes.chatAvatar} alt={chat.users.filter(_user => _user !== user)[0]} src={`/images/${chat.img}`} size="tiny" variant='rounded' />
                        <Button size="small" color="warning">More info</Button>
                    </Box>
                    <div className={classes.headerButtons}>
                        <Button onClick={setSchedule} variant="contained" size="tiny" color="secondary-light">Set schedule</Button>
                        <Button onClick={endSession} variant="contained" size="tiny" color="error-light" disabled={endBtn}>End session</Button>
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
                                                    <Typography variant="body1">{msg.message}</Typography>
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
                                                <Typography variant="body1">Session Ended</Typography>
                                            </Divider>
                                        )
                                    }
                                </div>
                            )                         
                           
                            
                        })
                    }

                </Box>

                <ChatInput submitMessageFn={submitMessage} />
                
            </>
        )
    }


}

export default ChatView
