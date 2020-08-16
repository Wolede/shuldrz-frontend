import React, { useEffect } from 'react'
import { Grid, Typography, Badge, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import Link from 'next/link'
import Notification from 'components/Notification'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import Button from 'components/Button'
import { useStyles } from './styles'




const ChatList = ({ chats, user, selectedChatIndex, selectChatFn, closeChatList, chatExist }) => {


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
                            chat.messages[0].sender === user.username ? (

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
                                                        {chat.messages[chat.messages.length - 1].message  && chat.messages[chat.messages.length - 1].isDeleted ? 'message deleted' : (chat.messages[chat.messages.length - 1].message ?
                                                            chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...'
                                                         :( 
                                                            chat.messages[chat.messages.length - 1].sender == user.username ? 'You ended the session' : `${chat.messages[chat.messages.length - 1].sender} ended the session`)
                                                        )}
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                </div>

                            ) : (
                                    chat.messages[0].sender !== user.username && chatExist ?

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
                                                        {chat.messages[chat.messages.length - 1].message  && chat.messages[chat.messages.length - 1].isDeleted ? 'message deleted' : (chat.messages[chat.messages.length - 1].message ?
                                                            chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...'
                                                         :( 
                                                            chat.messages[chat.messages.length - 1].sender == user.username ? 'You ended the session' : `${chat.messages[chat.messages.length - 1].sender} ended the session`)
                                                        )}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </div>
                                        : (
                                            chat.messages.length > 1 ? <div onClick={closeChatList}>

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
                                                        {chat.messages[chat.messages.length - 1].message  && chat.messages[chat.messages.length - 1].isDeleted ? 'message deleted' : (chat.messages[chat.messages.length - 1].message ?
                                                            chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...'
                                                         :( 
                                                            chat.messages[chat.messages.length - 1].sender == user.username ? 'You ended the session' : `${chat.messages[chat.messages.length - 1].sender} ended the session`)
                                                        )}
                                                        </Typography>
                                                                
                                                        
                                                        

                                                    </Grid>
                                                </Grid>                         
                                             </div>       
                                                : 
                                            null                
                            )                                
                        )}        
                        
                    </>


                )
            })

        )
    }


}

export default ChatList
