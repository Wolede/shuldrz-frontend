import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import Notification from 'components/Notification'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import { useStyles } from './styles'




const ChatList = ({ chats, selectedChat, user, selectedChatIndex, selectChatFn }) => {



    const classes = useStyles()
    const mockChats = [0, 1, 2, 3]

    // const selectChat = (index) => {
    //     selectedChat(index)        
    // }

    const userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === user.email;

    const selectChat = (index) => selectChatFn(index);

    if (chats) {
        return (
            chats.map((chat, i) => {

                return (

                    <>
                        {
                            chat.receiverHasRead === false && !userIsSender(chat) ?
                            <Notification position='relative' top='30px' left='30px' zIndex='100'></Notification>  : null
                        }
                        <Grid
                            key={i}
                            onClick={() => selectChat(i)}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={i === selectedChatIndex ? classes.chatActive : classes.chatItem}
                        >
                            

                            <Avatar className={classes.avatar} alt={chat.users.filter(_user => _user !== user.email)[0]} src={`/images/${chat.img}`} size="small" variant='rounded' />
                            {/* <img src='/images/happy-woman.png'/> */}
                            <Grid
                                container
                                direction="column"
                                className={classes.typography}
                            >
                                <Typography className={classes.h4} variant="h4">{chat.users.filter(_user => _user !== user.email)[0].substring(0, 8)}</Typography>
                                <Typography variant="body2">
                                    {chat.messages[chat.messages.length - 1].message.substring(0, 30) + '...'}
                                </Typography>
                                
                            </Grid>



                        </Grid>
                    </>
                )
            })

        )
    } else  {

        return(
            <div>No chats available</div>
        )


    //     return (
    //         mockChats.map((chat, i) => {

    //             return (
    //                 <Paper padding="16px" active={true}>
    //                     <Grid
    //                         key={i}
    //                         className={classes.chatItem}
    //                         container
    //                         direction="row"
    //                         justify="center"
    //                         alignItems="center"
    //                     >

    //                         <Avatar alt="profile picture" src={`/images/radn`} size="small" variant='rounded' />
    //                         <Grid
    //                             container
    //                             direction="column"
    //                             className={classes.typography}
    //                         >
    //                             <Typography className={classes.h4} variant="h4">Username</Typography>
    //                             <Typography variant="body2">
    //                                 Loading...
    //                         </Typography>
    //                         </Grid>

    //                     </Grid>
    //                 </Paper>
    //             )
    //         })
    //     )
    // }

        }       



}

export default ChatList
