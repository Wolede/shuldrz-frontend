import React, { useEffect, useState } from 'react'
import { Grid, Typography, Badge, Box, Fab, IconButton, MenuItem, Menu } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import Modal from 'components/Modal'
import Link from 'next/link'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Notification from 'components/Notification'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import GroupIcon from '@material-ui/icons/Group';
import Button from 'components/Button'
import ChatIcon from '@material-ui/icons/Chat';
import { useStyles } from './styles'
import { getGroupName } from '../../helpers'
import Linkify from 'react-linkify';




const ChatList = ({ chats, selectedChat, user, selectedChatIndex, selectChatFn, closeChatList, selectedUser, chatExist, submitNewChat, updateSelectedChat, deleteChat }) => {


    //this ensures that a user is always selected to chat with
    // useEffect(() => {
    //     const modChats = chats?.reduce((acc, curr) => {
    //                                 acc.push(...curr.usersDetails)
    //                                 return acc
    //                             } , [])
    //                             .filter(item => item.userId !== user.id)

    //     const desiredIndex = modChats.findIndex(chat => chat?.userId === selectedUser?.id);

    //     selectedUser && chats.length > 0 ? selectChat(desiredIndex) : selectChat(0);

    // }, [])


    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    let view

    // open add sessions modal
    const [openModal, setOpenModal] = useState(false);
    const modalOpen = () => {
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    const userIsSender = (chat) => {        
        chat.messages[chat.messages.length - 1].sender === user.email
    }

    const handleClick = (event) => {        
        setAnchorEl(event.currentTarget);
    };

    const closeAnchor = () => {
        setAnchorEl(null);
    };



    const selectChat = (index) => selectChatFn(index);

    
    return (
        <>
        <Box margin="1rem 1rem 1rem 1rem" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">
                Sessions
            </Typography>
            <Fab color="primary" aria-label="new-session" size="small" onClick={modalOpen}>
                <ChatIcon fontSize="small" />
            </Fab>
        </Box>
        { chats.length > 0 && chats.some(chat => chat.messages.length > 1 || chat.messages[0]?.sender == user.username)  ? (
            chats.map((chat, i) => (
                <>                    
                    {
                        
                        // chat.receiverHasRead === false && !userIsSender(chat) ?
                        // <Notification position='relative' top='30px' left='30px' zIndex='100'></Notification>  : null
                        chat.messages[0].sender === user.username && !chat?.usersDetails.find(_user => _user.userId === user.id)?.hasDeletedChat ? (

                            <div onClick={closeChatList}>

                                <Grid
                                    key={i}
                                    onClick={() => selectChat(i)}
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    className={i === selectedChatIndex ? classes.chatActive : classes.chatItem}
                                >   
                                    <Badge
                                        color="error"
                                        variant="dot"
                                        invisible={chat.receiverHasRead === false && !userIsSender(chat) ? false : true}
                                        overlap='Avatar'
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Avatar className={classes.avatar} alt={chat.users.filter(_user => _user !== user.username)[0]}
                                            src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null && !chat.groupName
                                                ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image :
                                                null
                                            }
                                            size="small"
                                            variant='rounded'
                                        >
                                            {chat.groupName && <GroupIcon/>}
                                        </Avatar>
                                    </Badge>
                            

                                    <Grid
                                        container
                                        direction="column"
                                        className={classes.typography}
                                    >

                                    <Typography className={classes.h4} variant="h4">

                                    { chat.groupName &&
                                        chat.groupName.updated 
                                        ? chat.groupName.title 
                                        :
                                        `${getGroupName('chatList', chat.usersDetails, user).name}
                                        ${getGroupName('chatList', chat.usersDetails, user).more}`
                                    }
                                    { !chat.groupName ?
                                        chat.users.filter(_user => _user !== user.username).find(user => user)
                                        :
                                        null
                                    }
                                    </Typography>
                                        {
                                        chat.messages[chat.messages.length - 1].message  && chat.messages[chat.messages.length - 1].isDeleted && (
                                            <Typography variant="body2">
                                                message deleted
                                            </Typography>
                                        )
                                        }
                                        
                                        {
                                            chat.messages[chat.messages.length - 1].message && chat.messages[chat.messages.length - 1].isDeleted === false && (
                                                
                                                <Typography variant="body2">
                                                    <Linkify
                                                        componentDecorator={(decoratedHref, decoratedText, key) => (
                                                            <a target="blank" href={decoratedHref} key={key}>
                                                                {decoratedText}
                                                            </a>
                                                        )}
                                                    >
                                                        {chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...'}
                                                    </Linkify>
                                                </Typography>
                                            )
                                        }


                                        {
                                            chat.messages[chat.messages.length - 1].session == 'ended' &&
                                            (
                                                <Typography variant="body2">
                                                    Session ended
                                                </Typography>
                                            )
                                        }

                                        {
                                            chat.messages[chat.messages.length - 1].present == false && chat.messages[chat.messages.length - 1].sender === user.username ?  
                                            (
                                                <Typography variant="body2">
                                                    You left the group
                                                </Typography>
                                            )

                                            :  chat.messages[chat.messages.length - 1].present === false ?
                                            ( 
                                                <Typography variant="body2">
                                                    {
                                                        chat.messages[chat.messages.length - 1].sender 
                                                    } left the group
                                                </Typography>    
                                            ): null
                                        }
                                        

                                    </Grid>

                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={(e) => {handleClick(e, chat.usersDetails.find(_user => _user.userId === user.id))}}
                                        color='secondary'
                                        style={{ padding: '0 0 0 5px' }}
                                    >
                                        <KeyboardArrowDownIcon fontSize="large" style={i === selectedChatIndex ? { color: '#ffffff' } : { color: '#3f316b' }} />
                                    </IconButton>

                                    <Menu
                                        id="simple-menu"                                                                        
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={closeAnchor}
                                    >
                                        <MenuItem onClick={() => {deleteChat(); closeAnchor();}}>Delete conversation</MenuItem>
                                    </Menu>
                                </Grid>
                            </div>

                        ) : ( chat.messages.length > 1 && ((chat.groupName && chat.usersDetails.find(_user => _user.userId === user.id).isPresent) || !chat.groupName) && !chat.usersDetails.find(_user => _user.userId === user.id).hasDeletedChat ? 
                            <div onClick={closeChatList}>
                                <Grid
                                    key={i}
                                    onClick={() => selectChat(i)}
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    className={i === selectedChatIndex ? classes.chatActive : classes.chatItem}
                                >
                                    <Badge
                                        color="error"
                                        variant="dot"
                                        invisible={chat.receiverHasRead === false && !userIsSender(chat) ? false : true}
                                        overlap='Avatar'
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Avatar className={classes.avatar} alt={chat.users.filter(_user => _user !== user.username)[0]}
                                            src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null && !chat.groupName
                                                ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image :
                                                null
                                            }
                                            size="small"
                                            variant='rounded'
                                        >
                                            {chat.groupName && <GroupIcon/>}
                                        </Avatar>
                                    </Badge>

                                    <Grid
                                        container
                                        direction="column"
                                        className={classes.typography}
                                    >

                                        <Typography className={classes.h4} variant="h4">
                                        { chat.groupName 
                                        ?`${getGroupName('chatList', chat.usersDetails, user).name}
                                        ${getGroupName('chatList', chat.usersDetails, user).more}` :chat.users.filter(_user => _user !== user.username).find(user => user)
                                        }
                                        </Typography>


                                        {
                                        chat.messages[chat.messages.length - 1].message  && chat.messages[chat.messages.length - 1].isDeleted && (
                                            <Typography variant="body2">
                                                message deleted
                                            </Typography>
                                        )
                                        }
                                        
                                        {
                                            chat.messages[chat.messages.length - 1].message && chat.messages[chat.messages.length - 1].isDeleted === false && (
                                                <Typography variant="body2">
                                                    <Linkify
                                                        componentDecorator={(decoratedHref, decoratedText, key) => (
                                                            <a target="blank" href={decoratedHref} key={key}>
                                                                {decoratedText}
                                                            </a>
                                                        )}
                                                    >
                                                        {chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...'}
                                                    </Linkify>
                                                </Typography>
                                            )
                                            
                                        }


                                        {
                                            chat.messages[chat.messages.length - 1].session == 'ended' &&
                                            (
                                                <Typography variant="body2">
                                                    Session ended
                                                </Typography>
                                            )
                                        }

                                        {
                                            chat.messages[chat.messages.length - 1].present == false && chat.messages[chat.messages.length - 1].sender === user.username ?  
                                            (
                                                <Typography variant="body2">
                                                    You left the group
                                                </Typography>
                                            )

                                            :  chat.messages[chat.messages.length - 1].present === false ?
                                            ( 
                                                <Typography variant="body2">
                                                    {
                                                        chat.messages[chat.messages.length - 1].sender 
                                                    } left the group
                                                </Typography>    
                                            ): null
                                        }
                                        
                                    </Grid>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={(e) => {handleClick(e, chat.usersDetails.find(_user => _user.userId === user.id))}}
                                        color='secondary'
                                        style={{ padding: '0 0 0 5px' }}
                                    >
                                        <KeyboardArrowDownIcon fontSize="large" style={i === selectedChatIndex ? { color: '#ffffff' } : { color: '#3f316b' }} />
                                    </IconButton>

                                    <Menu
                                        id="simple-menu"                                                                        
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={closeAnchor}
                                    >
                                        <MenuItem onClick={() => {deleteChat(); closeAnchor();}}>Delete conversation</MenuItem>
                                    </Menu>
                                    
                                </Grid>                         
                                </div>       
                            : 
                            null
                        )             
                    }        
                    
                    

                </>
            ))

        ) : ( 
            <div style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "inherit"
            }}
            >
                {
                    user?.userType === 'Guest' ? (
                        <Typography align="center" variant="body1"> You currently do not have any message</Typography>
                    ) : (
                            <Typography align="center" variant="body1"> You currently do not have messages from guests</Typography>
                        )
                }
    
                <Link href="/app/buddies">
                    <a style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                        >
                            Go to Buddies page
                        </Button>
                    </a>
                </Link>
            </div>
        )

        }
        {/* Load Custom Modal COmponent */}
        {openModal === true &&
            (
                <Modal handleClose={closeModal} openModal={openModal} view='addSessions' callbacks={{submitNewChat, updateSelectedChat}} />
            )
        }
        </>
    )
    
}

export default ChatList
