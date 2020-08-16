import React, { useEffect } from 'react'
import { Grid, Typography, Badge } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import Notification from 'components/Notification'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import { useStyles } from './styles'




const ChatList = ({ chats, selectedChat, user, selectedChatIndex, selectChatFn, closeChatList, selectedUser }) => {


    //this ensures that a user is always selected to chat with
    useEffect(() => {
        const modChats = chats?.flatMap(item => item.usersDetails)
                                .filter(item => item.userId !== user.id)

        const desiredIndex = modChats.findIndex(chat => chat?.userId === selectedUser?.id);

        selectedUser && chats.length > 0 ? selectChat(desiredIndex) : selectChat(0);

    }, [])


    const classes = useStyles()


    const badgeHandler = () => {

    }

    const userIsSender = (chat) => {
        const a = false;        
        chat.messages[chat.messages.length - 1].sender === user.email
    }



    const selectChat = (index) => selectChatFn(index);

    if (chats) {
        
        return (
            chats.map((chat, i) => {
                
                return (

                    <>
                        {
                            
                            // chat.receiverHasRead === false && !userIsSender(chat) ?
                            // <Notification position='relative' top='30px' left='30px' zIndex='100'></Notification>  : null
                            user.userType === 'Guest' ?  (

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
                                        {
                                            chat.receiverHasRead === false && !userIsSender(chat)
                                                ?
                                                <Badge
                                                    color="error"
                                                    variant="dot"
                                                    invisible={false}
                                                    overlap='Avatar'
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <Avatar className={classes.avatar} alt={chat.users.filter(_user => _user !== user.username)[0]} 
                                                        src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null 
                                                        ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image : 
                                                        chat.users.filter(_user => _user !== user.username)[0]} 
                                                        size="small" 
                                                        variant='rounded' 
                                                    />
                                                </Badge>
                                                :

                                                <Avatar className={classes.avatar} alt={chat.users.filter(_user => _user !== user.username)[0]} 
                                                        src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null 
                                                        ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image : 
                                                        chat.users.filter(_user => _user !== user.username)[0]} 
                                                        size="small" 
                                                        variant='rounded' 
                                                />
                                        }

                                        <Grid
                                            container
                                            direction="column"
                                            className={classes.typography}
                                        >

                                            <Typography className={classes.h4} variant="h4">{chat.users.filter(_user => _user !== user.username).find(user => user)}</Typography>
                                            <Typography variant="body2">
                                                {chat.messages[chat.messages.length - 1].message ? chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...' : null}
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                </div>
                            ):(
                                
                                chat.messages.length - 1 > 1 ? (
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
                                        {
                                            chat.receiverHasRead === false && !userIsSender(chat)
                                                ?
                                                <Badge
                                                    color="error"
                                                    variant="dot"
                                                    invisible={false}
                                                    overlap='Avatar'
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <Avatar className={classes.avatar} 
                                                        alt={chat.users.filter(_user => _user !== user.username)[0]} 
                                                        src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null 
                                                        ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image : 
                                                        chat.users.filter(_user => _user !== user.username)[0]} 
                                                        size="small" 
                                                        variant='rounded'
                                                    />
                                                </Badge>
                                                :

                                                <Avatar className={classes.avatar} 
                                                    alt={chat.users.filter(_user => _user !== user.username)[0]} 
                                                    src={chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image !== null 
                                                    ? chat.usersDetails.filter(_user => _user.userId !== user.id)[0].image : 
                                                    chat.users.filter(_user => _user !== user.username)[0]} 
                                                    size="small" 
                                                    variant='rounded'                                                     
                                                />
                                        }

                                        <Grid
                                            container
                                            direction="column"
                                            className={classes.typography}
                                        >

                                            <Typography className={classes.h4} variant="h4">{chat.users.filter(_user => _user !== user.username).find(user => user)}</Typography>
                                            <Typography variant="body2">
                                                {chat.messages[chat.messages.length - 1].message ? chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...' : null}
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                </div>
                                ): (
                                    <>
                                        <Typography align="center" variant="body1"> Chats empty</Typography>
                                        <Typography align="center" variant="body1"> You currently do not have messages from guests</Typography>
                                    </>
                            
                            )
                        )}
                            
                            
                        
                    </>


                )
            })

        )
    } else {

        return (
            <div>No chats available</div>
        )

    }



}

export default ChatList
