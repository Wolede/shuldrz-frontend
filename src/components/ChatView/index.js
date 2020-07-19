import { Grid, Typography } from '@material-ui/core'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import ChatInput from 'components/ChatInput'
import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import Divider from 'components/Divider'




const ChatView = ({ user, chat, endSessionFn, endBtn }) => {
    const classes = useStyles()

    const [sessionStart, updateSessionStart] = useState(true)
    const [sessionEnd, updateSessionEnd] = useState(true)


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
            <div>

                <Grid
                    // container
                    direction="row"
                    className={classes.chatHeader}
                    justify="space-between"
                    alignItems="center"
                    
                >
                    <div className={classes.chatHeaderLink}>
                        <Avatar className={classes.chatAvatar} alt={chat.users.filter(_user => _user !== user)[0]} src={`/images/${chat.img}`} size="tiny" variant='rounded' />
                        <Button size="small" color="warning">More info</Button>
                    </div>


                    <div className={classes.chatHeaderSession}>
                        <Button onClick={setSchedule} variant="contained" size="tiny" color="secondary-light">Set schedule</Button>
                        <Button onClick={startSession} variant="contained" size="tiny" color="secondary-light">Start session</Button>
                        <Button onClick={endSession} variant="contained" size="tiny" disabled={endBtn}>End session</Button>
                    </div>
                </Grid>
                <div  id="chatview-container" className={classes.chatContainer}>
                    
                    {
                        chat.messages.map((msg, i) => {   

                            return (
                                <div key={i}>
                                    {
                                        msg.message && (
                                            <div className={msg.sender === user ? classes.userSent : classes.friendSent}>

                                            <Typography variant="h6">{msg.message}</Typography>

                                            </div>
                                        )
                                    }
                                    {                                       
                                        msg.session === 'started' && (<Divider>Session Started</Divider>)
                                    }

                                    {   
                                        msg.session === 'ended' && (<Divider>Session Ended</Divider>)
                                    }
                                </div>
                            )                         
                           
                           {/* return msg.message ? (
                                
                                
                            ) : null                                   */}
                            
                        })
                    }

                    {/* {sessionEnd ? <Divider>Session Ended</Divider> : null} */}

                </div>

                
                
            </div>
        )
    }


}

export default ChatView
