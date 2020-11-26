import React, { useState, useEffect } from 'react'
import { Grid, Typography, Box, Fab, useMediaQuery, Button as MuiButton, IconButton, MenuItem, Menu } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import Link from 'next/link'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import GroupIcon from '@material-ui/icons/Group'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import ChatInput from 'components/ChatInput'
import { useStyles } from './styles'
import Divider from 'components/Divider'
import moment from 'moment'
import MiniDrawer from 'components/MiniDrawer'
import Dialog from 'components/Dialog'
import ChatProfile from '../ChatProfile'
import { getGroupName } from '../../helpers'
import Linkify from 'react-linkify';





const ChatView = ({ user, chat, endSessionFn, endBtn, backBtn, selectedChatIndex, submitMessage, userClickedInput, selectedUser, prevReview, deleteMessage, chatList }) => {
    const classes = useStyles()

    // More sidebar profile stuff 
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });



    const [openRightSidebar, setOpenRightSidebar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [type, setType] = useState(null)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [groupDisabled, setGroupDisabled] = React.useState(false);
    
    const view = chat.groupName ? 'groupChat' : 'singleChat'    
    let image

    const handleDialogOpen = (displayImage) => {
        setOpenDialog(true)
        setType('viewImage')
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const setImage = (msg) => {
        image = msg
        return true;
    }

    const handleRightSidebarOpen = () => {
        setOpenRightSidebar(true);
    };

    const handleRightSidebarClose = () => {
        setOpenRightSidebar(false);
    };

    const [ts, setTs] = useState(0);

    const handleClick = (event, timestamp) => {
        setTs(timestamp)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filteredChat = (chat) => {
        const data = chat.reduce((acc, curr) => {
            acc.push(curr)
            const deletedMessages = acc.find(item => item.session == 'deleted' && item.sender === user.username)

            if (deletedMessages) {
                acc = []
                acc.push(curr)
            }

            return acc
        }, [])
        // console.log('FILTERED CHAT', data)

        return data
    }
    // const shouldOpenRightSidebar = isDesktop ? false : openRightSidebar;

    //check if admin or user left the group chat  
    useEffect(() => {
        setGroupDisabled(false)
        const userDetail = chat?.usersDetails.find(_user => _user.username === user.username)?.isPresent
        // console.log('CHECK IF USER IS PRESENT', userDetail)

        if (chat?.usersDetails.some(user => user.isAdmin && !user.isPresent) || !userDetail) {
            setGroupDisabled(true)
        }

        filteredChat(chat.messages)
    }, [chat])


    const endSession = () => {
        endSessionFn()
    }

    
    useEffect(() => {
        const container = document.getElementById('chatview-container');
        if (container && !anchorEl)
            container.scrollTo(0, container.scrollHeight);
    }, [chat.messages.length])

    const [mostRecentTimestamp, setMostRecentTimeStamp] = useState(0);
    useEffect(() => {
        const chat = chatList[selectedChatIndex];
        const options = {
            body: chat?.messages[chat?.messages?.length - 1]?.message,
            icon: '/images/favicon.png',
        }

        //if a message is received and the user still hasn't granted permission then
        //ask again
        if (("Notification" in window) && Notification.permission !== "granted" ) {
            Notification.requestPermission();
        }

        //conditions 1. Is the notification api supported 2. Has the user granted permission to display notifications? 3. Is the sender of the message different from the user receiving the notifications?
        // 4. is the user currently on shuldrz or somewhere else? 5. is the timestamp of the message about to be displayed different from the timestamp of the most recently displayed message. 
        //6. Is the serviceWorker api supported 7. Is the new object a valid message to be displayed
        if (
            ("Notification" in window) && 
            Notification.permission === "granted" && 
            chat?.messages[chat?.messages?.length - 1]?.sender !== user.username && 
            !document.hasFocus() && 
            chat?.messages[chat?.messages?.length - 1]?.timestamp !== mostRecentTimestamp && 
            ('serviceWorker' in navigator) &&
            chat?.messages[chat?.messages?.length - 1].message
        ) {
            // let notification = new Notification(`${chat?.messages[chat?.messages?.length - 1]?.sender}`, options);
            // notification.onclick = () => window.focus();
            console.log('msg', chat?.messages[chat?.messages?.length - 1].message)

            navigator.serviceWorker.getRegistration().then((reg) => {
                setMostRecentTimeStamp(chat?.messages[chat?.messages?.length - 1]?.timestamp)
                // reg.showNotification(`${chat?.messages[chat?.messages?.length - 1]?.sender}`, options)
                reg.showNotification(`You've got a tap on Shuldrz!`, options)
            })
        }

    }, [chat?.messages?.length])

    return (

        <>
            {chat === undefined ?

                (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "inherit"
                    }}
                    >
                        <Typography align="center" variant="body2"> Select a chat to view it's content, if there are no chats on the side kindly visit the buddies page</Typography>

                    </div>

                )
                : chatList[selectedChatIndex].messages.length <= 1 && chatList[selectedChatIndex]?.messages[0]?.sender !== user.username ?

                    (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            height: "inherit"
                        }}
                        >
                            <Typography align="center" variant="body2"> Select a chat to view it's content, if there are no chats on the side kindly visit the buddies page</Typography>

                        </div>
                    )            
                : (

                    <>
                        {
                            <MiniDrawer
                                direction='left'
                                open={openRightSidebar}
                                width='100%'
                                position='absolute'
                            >
                                <ChatProfile
                                    prevReview={prevReview}
                                    chatProfile={selectedUser}
                                    closeChatProfile={handleRightSidebarClose}
                                    view={view}
                                    // view={ chat.groupName ? 'groupChat' : 'singleChat' }
                                    chat={chat}
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
                                <Button
                                    variant="contained"
                                    color="secondary-light"
                                    size='small'
                                    startIcon={
                                        <Avatar
                                            className={classes.chatAvatar}
                                            alt={chat.users.filter(_user => _user !== user.username)[0]}
                                            src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null && view === "singleChat"
                                                ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image :
                                                null
                                            }
                                            size="tiny" variant='rounded'
                                        >
                                            {view === "groupChat" && <GroupIcon/>}
                                            {!chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image && view === "singleChat" ? chat.users.filter(_user => _user !== user.username)[0]?.substring(0,1) : null}
                                        </Avatar>
                                    }
                                    onClick={handleRightSidebarOpen}
                                    disabled={ !selectedUser }
                                >
                                    <ChatProfile
                                        prevReview={prevReview}
                                        chatProfile={selectedUser}
                                        closeChatProfile={handleRightSidebarClose}
                                        view={view}
                                        // view={ chat.groupName ? 'groupChat' : 'singleChat' }
                                        chat={chat}
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
                                    <Button
                                        variant="contained"
                                        color="secondary-light"
                                        size='small'
                                        startIcon={
                                            <Avatar
                                                className={classes.chatAvatar}
                                                alt={chat.users.filter(_user => _user !== user.username)[0]}
                                                src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null && view === "singleChat"
                                                    ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image :
                                                    null
                                                }
                                                size="tiny" variant='rounded'
                                            >
                                                {view === "groupChat" && <GroupIcon />}
                                                {!chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image && view === "singleChat" ? chat.users.filter(_user => _user !== user.username)[0].substring(0, 1) : null}
                                            </Avatar>
                                        }
                                        onClick={handleRightSidebarOpen}
                                        disabled={!selectedUser}
                                    >
                                        More
                                </Button>

                                    <Typography className={classes.h5} variant="h5">
                                        {view === 'groupChat' && chat.groupName.updated
                                            ? chat.groupName.title
                                            : `${getGroupName('chatView', chat.usersDetails, user).name} ${getGroupName('chatView', chat.usersDetails, user).more}`
                                        }
                                    </Typography>

                                </Box>
                                {view === "singleChat" &&
                                    <div className={classes.headerButtons}>
                                        <Button onClick={endSession} variant="contained" size="tiny" color="error-light" disabled={endBtn()}>End session</Button>
                                    </div>
                                }
                            </Box>
                            <Box flexGrow='1' padding='2rem 0 2rem 0' overflow="auto" id="chatview-container">

                                {

                                    filteredChat(chat.messages).length > 0 ? filteredChat(chat.messages).map((msg, i) => {

                                        return (
                                            <div key={msg.timestamp || i}>
                                                {
                                                    msg.session === 'started' && (
                                                        <Divider>
                                                            <Typography variant="body1">Session Started</Typography>
                                                        </Divider>
                                                    )
                                                }

                                                {
                                                    msg.message && msg.isDeleted ? (
                                                        <div className={msg.sender === user.username ? classes.userSent : classes.friendSent}>
                                                            <div>
                                                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                                    <Typography variant="body1" className={classes.messageBox}>
                                                                        <Linkify
                                                                            componentDecorator={(decoratedHref, decoratedText, key) => (
                                                                                <a target="blank" href={decoratedHref} key={key}>
                                                                                    {decoratedText}
                                                                                </a>
                                                                            )}
                                                                        >
                                                                            {msg.message}
                                                                        </Linkify>
                                                                    </Typography>
                                                                    <IconButton
                                                                        aria-label="more"
                                                                        aria-controls="long-menu"
                                                                        aria-haspopup="true"
                                                                        onClick={(e) => {handleClick(e, msg.timestamp)}}
                                                                        color='secondary'
                                                                        style={{ padding: '0 0 0 5px' }}
                                                                    >
                                                                        <KeyboardArrowDownIcon fontSize="medium" style={{ color: '#ffffff' }} />
                                                                    </IconButton>

                                                                    <Menu
                                                                        id="simple-menu"                                                                        
                                                                        anchorEl={anchorEl}
                                                                        open={Boolean(anchorEl)}
                                                                        onClose={handleClose}
                                                                    >
                                                                        <MenuItem onClick={() => {deleteMessage(ts); handleClose();}}>Delete message</MenuItem>
                                                                    </Menu>
                                                                </div>
                                                            </div>
                                                            <Typography color="textSecondary" className='timestamp'>
                                                                {moment(msg.timestamp).calendar()}
                                                            </Typography>
                                                        </div>
                                                    )
                                                        :

                                                        msg.message && msg.sender === user.username ? (
                                                            <div className={classes.userSent}>
                                                                <div>
                                                                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                                        {msg.message.split('%2F').includes('images') ?   (
                                                                            setImage(msg.message) && 
                                                                            <Box onClick={handleDialogOpen} className={classes.img}>                                                                                
                                                                                <Avatar alt="Remy Sharp" src={msg.message}/>
                                                                            </Box>
                                                                            )                                                                             
                                                                            :
                                                                            <Typography variant="body1" className={classes.messageBox}>
                                                                                <Linkify
                                                                                    componentDecorator={(decoratedHref, decoratedText, key) => (
                                                                                        <a target="blank" href={decoratedHref} key={key}>
                                                                                            {decoratedText}
                                                                                        </a>
                                                                                    )}
                                                                                >
                                                                                    {msg.message}
                                                                                </Linkify>
                                                                            </Typography>
                                                                        }

                                                                        <IconButton
                                                                            aria-label="more"
                                                                            aria-controls="long-menu"
                                                                            aria-haspopup="true"
                                                                            onClick={(e) => { handleClick(e, msg.timestamp) }}
                                                                            color='secondary'
                                                                            style={{ padding: '0 0 0 5px' }}
                                                                        >
                                                                            <KeyboardArrowDownIcon fontSize="medium" style={{ color: '#ffffff' }} />
                                                                        </IconButton>

                                                                        <Menu
                                                                            id="simple-menu"
                                                                            anchorEl={anchorEl}
                                                                            open={Boolean(anchorEl)}
                                                                            onClose={handleClose}
                                                                        >
                                                                            <MenuItem onClick={() => { deleteMessage(ts); handleClose(); }}>Delete message</MenuItem>
                                                                        </Menu>
                                                                    </div>
                                                                </div>
                                                                <Typography color="textSecondary" className='timestamp'>
                                                                    {moment(msg.timestamp).calendar()}
                                                                </Typography>
                                                            </div>
                                                        )
                                                            :

                                                            msg.message ? (
                                                                <div className={classes.friendSent}>
                                                                    <div>
                                                                        {view === "groupChat" &&
                                                                            <Typography variant="body2" color="secondary">{msg.sender}</Typography>
                                                                        }
                                                                        <Typography variant="body1" className={classes.messageBox}>{msg.message}</Typography>
                                                                    </div>
                                                                    <Typography color="textSecondary" className='timestamp'>
                                                                        {moment(msg.timestamp).calendar()}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                                :
                                                                null

                                                }

                                })
                                : 
                                chat.messages.map ((msg, i) => {
                                    
                                    return (
                                        <div key={msg.timestamp || i}>
                                            {
                                                msg.session === 'started' && (
                                                    <Divider>
                                                        <Typography variant="body1">Session Started</Typography>
                                                    </Divider>
                                                )
                                            }

                                            {
                                                msg.message && msg.isDeleted ? (
                                                    <div className={msg.sender === user.username ? classes.userSent : classes.friendSent}>
                                                        <div>
                                                            <Typography variant="body1" color="textPrimary" className={classes.messageBox}>
                                                                message deleted
                                                                <RemoveCircleOutlineIcon fontSize="small" style={{ margin: '0 .3rem 0 .3rem', verticalAlign: 'middle' }} />
                                                            </Typography>
                                                        </div>
                                                        <Typography color="textSecondary" className='timestamp'>
                                                            {moment(msg.timestamp).calendar()}
                                                        </Typography>
                                                    </div>
                                                )
                                                    :
                                                    
                                                    msg.message && msg.sender === user.username ? (
                                                        <div className={classes.userSent}>                                                            
                                                            <div>
                                                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                                    <Typography variant="body1" className={classes.messageBox}>
                                                                        <Linkify
                                                                            componentDecorator={(decoratedHref, decoratedText, key) => (
                                                                                <a target="blank" href={decoratedHref} key={key}>
                                                                                    {decoratedText}
                                                                                </a>
                                                                            )}
                                                                        >
                                                                            {msg.message}
                                                                        </Linkify>
                                                                    </Typography>
                                                                    <IconButton
                                                                        aria-label="more"
                                                                        aria-controls="long-menu"
                                                                        aria-haspopup="true"
                                                                        onClick={(e) => {handleClick(e, msg.timestamp)}}
                                                                        color='secondary'
                                                                        style={{ padding: '0 0 0 5px' }}
                                                                    >
                                                                        <KeyboardArrowDownIcon fontSize="medium" style={{ color: '#ffffff' }} />
                                                                    </IconButton>

                                                                    <Menu
                                                                        id="simple-menu"                                                                        
                                                                        anchorEl={anchorEl}
                                                                        open={Boolean(anchorEl)}
                                                                        onClose={handleClose}
                                                                    >
                                                                        <MenuItem onClick={() => {deleteMessage(ts); handleClose();}}>Delete message</MenuItem>
                                                                    </Menu>
                                                                </div>
                                                            </div>
                                                            <Typography color="textSecondary" className='timestamp'>
                                                                {moment(msg.timestamp).calendar()}
                                                            </Typography>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    msg.present === false && (
                                                        <Divider>
                                                            <Typography variant="body1">{msg.sender == user.username ? 'You' : msg.sender} left the group </Typography>
                                                        </Divider>
                                                    )
                                                }


                                            </div>


                                        )

                                    })
                                        :
                                        chat.messages.map((msg, i) => {

                                            return (
                                                <div key={msg.timestamp || i}>
                                                    {
                                                        msg.session === 'started' && (
                                                            <Divider>
                                                                <Typography variant="body1">Session Started</Typography>
                                                            </Divider>
                                                        )
                                                    }

                                                    {
                                                        msg.message && msg.isDeleted ? (
                                                            <div className={msg.sender === user.username ? classes.userSent : classes.friendSent}>
                                                                <div>
                                                                    {view === "groupChat" &&
                                                                        <Typography variant="body2" color="secondary">{msg.sender}</Typography> 
                                                                    }
                                                                    <Typography variant="body1" className={classes.messageBox}>
                                                                        <Linkify
                                                                            componentDecorator={(decoratedHref, decoratedText, key) => (
                                                                                <a target="blank" href={decoratedHref} key={key}>
                                                                                    {decoratedText}
                                                                                </a>
                                                                            )}
                                                                        >
                                                                            {msg.message}
                                                                        </Linkify>
                                                                    </Typography>
                                                                </div>
                                                                <Typography color="textSecondary" className='timestamp'>
                                                                    {moment(msg.timestamp).calendar()}
                                                                </Typography>
                                                            </div>
                                                        )
                                                            :

                                                            msg.message && msg.sender === user.username ? (
                                                                <div className={classes.userSent}>
                                                                    <div>
                                                                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                                                            <Typography variant="body1" className={classes.messageBox}>{msg.message}</Typography>
                                                                            <IconButton
                                                                                aria-label="more"
                                                                                aria-controls="long-menu"
                                                                                aria-haspopup="true"
                                                                                onClick={(e) => { handleClick(e, msg.timestamp) }}
                                                                                color='secondary'
                                                                                style={{ padding: '0 0 0 5px' }}
                                                                            >
                                                                                <KeyboardArrowDownIcon fontSize="medium" style={{ color: '#ffffff' }} />
                                                                            </IconButton>

                                                                            <Menu
                                                                                id="simple-menu"
                                                                                anchorEl={anchorEl}
                                                                                open={Boolean(anchorEl)}
                                                                                onClose={handleClose}
                                                                            >
                                                                                <MenuItem onClick={() => { deleteMessage(ts); handleClose(); }}>Delete message</MenuItem>
                                                                            </Menu>
                                                                        </div>
                                                                    </div>
                                                                    <Typography color="textSecondary" className='timestamp'>
                                                                        {moment(msg.timestamp).calendar()}
                                                                    </Typography>
                                                                </div>
                                                            )
                                                                :

                                                                msg.message ? (
                                                                    <div className={classes.friendSent}>
                                                                        <div>
                                                                            {view === "groupChat" &&
                                                                                <Typography variant="body2" color="secondary">{msg.sender}</Typography>
                                                                            }
                                                                            <Typography variant="body1" className={classes.messageBox}>{msg.message}</Typography>
                                                                        </div>
                                                                        <Typography color="textSecondary" className='timestamp'>
                                                                            {moment(msg.timestamp).calendar()}
                                                                        </Typography>
                                                                    </div>
                                                                )
                                                                    :
                                                                    null

                                                    }

                                                    {
                                                        msg.session === 'ended' && (
                                                            <Divider>
                                                                <Typography variant="body1">{msg.sender == user.username ? 'You' : msg.sender} ended the session</Typography>
                                                            </Divider>
                                                        )
                                                    }

                                                    {
                                                        msg.present === false && (
                                                            <Divider>
                                                                <Typography variant="body1">{msg.sender == user.username ? 'You' : msg.sender} left the group </Typography>
                                                            </Divider>
                                                        )
                                                    }


                                                </div>


                                            )

                                        })

                                }

                            </Box>

                            <ChatInput
                                user={user}
                                chat={chat}
                                userClickedInput={userClickedInput}
                                submitMessageFn={submitMessage}
                                isGroupDisabled={groupDisabled} // to be made dynamic
                            />

                            {/* Load Custom Dialog COmponent */}
                            {openDialog === true &&
                                (
                                    <Dialog 
                                    handleClose={handleDialogClose} 
                                    openDialog={openDialog} 
                                    disableEscape={false} 
                                    view={type}
                                    image={image}
                                    />
                                )
                            }

                        </>

                    )


            }
        </>
    )
}

ChatView.propTypes = {
    backBtn: PropTypes.func,
    endBtn: PropTypes.bool
};

export default ChatView
