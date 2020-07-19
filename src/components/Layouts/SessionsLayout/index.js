import React, { useState, useEffect, useRef } from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Paper from 'components/Paper'
import ChatList from 'components/ChatList'
import ChatView from 'components/ChatView'
import Link from 'next/link'
import Button from 'components/Button'
import useAuth from 'contexts/Auth'
import { SelectedUserContext } from 'contexts/SelectedUserContext';
import { ChatContext } from 'contexts/ChatContext';
import { useStyles } from './style'

const firebase = require("firebase");



const Sessions = (props) => {
    const classes = useStyles()
    
    const { user, loading } = useAuth()

    
    // const [chats, updateChatList] = useState()
    const [selectedChat, updateSelectedChat] = useState(0)
    const [selectedUser, setSelectedUser] = React.useContext(SelectedUserContext)
    const [chats, setChats] = React.useContext(ChatContext)

    const newChatFn = () => {
        console.log('new chat clicked')
    }

    // function scrollToEnd(){
    //     var chatList = document.getElementById("chatview-container");
    //     chatList.scrollTop = chatList.scrollHeight;
    // }

    const chatContainer = useRef()
    const scrollToMyRef = () => {
        console.log(chatContainer)
        const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll)
    }

    useEffect(() => {

        if (user !== null || undefined) {
           

            firebase.firestore().collection('chats').where('users', 'array-contains', user.email).orderBy('currentTime', 'desc')
            .onSnapshot(res => {
                const firebase_chats = res.docs.map(doc => doc.data())    
                console.log('firebase chats', firebase_chats)       
                setChats(firebase_chats)    

            })
           
        }

        if (selectedUser) {           
            submitNewChat()  
        }


        if (selectedChat) {
            messageRead();
        }

        console.log('chats', chats)
        console.log('selected chat', selectedChat)        
        console.log('sessions message', selectedUser);


    }, [user]);

    

    const selectChat = (chatIndex) => {        
        
        updateSelectedChat(chatIndex)
        
    }

    const buildDocKey = (friend) => [user.email, friend].sort().join(':');

    const submitMessage = (msg) => {
        // console.log('submitMessageChats', selectedChat.messages.length)
        const sessionState = chats[selectedChat].messages.length === 0 ? [] : 
        chats[selectedChat].messages[chats[selectedChat].messages.length - 1].session

        console.log('sessionValue', chats[selectedChat].messages[chats[selectedChat].messages.length - 1])
        console.log('sessionState', sessionState)

        const session = sessionState === 'ended' || sessionState === 'none' || sessionState.length === 0 ? 'started' : sessionState === 'started' ? 'continuing' : 'continuing'

        
        const docKey = buildDocKey((chats[selectedChat]).users.filter(_usr => _usr !== user.email)[0])
        
       
        firebase.firestore().collection('chats').doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: user.email,
                    message: msg,
                    session: session,
                    timestamp: Date.now()
                }),
                currentTime: Date.now(),
                receiverHasRead: false
            });

        updateSelectedChat(0)
    }

    useEffect(() => {
        scrollToMyRef()
    }, [chats, selectedChat])

    

    const clickedMessageWhereNotSender = (chatIndex) =>  {
        if (chats[chatIndex].messages.length !== 0) {
            return chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== user.email 
        } else {
            console.log(chats[chatIndex].messages[chats[chatIndex].messages.length].sender !== user.email)
            return chats[chatIndex].messages[chats[chatIndex].messages.length].sender !== user.email;
        } 
    }

    const messageRead = () => {
        console.log(chats)
        const chatIndex = selectedChat === -1 ? 0 : selectedChat ;
        console.log(chatIndex)
        const docKey = buildDocKey(chats[chatIndex].users.filter(_usr => _usr !== user.email)[0]);   
        console.log(clickedMessageWhereNotSender(chatIndex))
        if (clickedMessageWhereNotSender(chatIndex)) {
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .update({ receiverHasRead: true });
        } else {
            console.log('Clicked message where the user was the sender');
        }
    }



    // <!-- Submit new chat when user cliks on the chat button on a profile --> 
    const submitNewChat = async () => {
        const newBuildDocKey = () =>  [user.email, selectedUser.email].sort().join(':');
        
        

        const userExists = async () => {
            const usersSnapshot = await
                firebase
                    .firestore()
                    .collection('users')
                    .get();
            const exists = usersSnapshot
                .docs
                .map(_doc => _doc.data().username)
                .includes(selectedUser.username);

            return exists;
        }

        const chatExists = async () => {
            const docKey = newBuildDocKey();
            const chat = await
                firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .get();
            console.log(chat.exists);
            return chat.exists;
        }

        const goToChat = (docKey) => {
            const usersInChat = docKey.split(':');
            const chat = chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
            updateSelectedChat(chats.indexOf(chat));
        }

        const newChatSubmit = async (chatObj) => {
            console.log('i am here')
            const docKey = newBuildDocKey();
            
            await 
            firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .set({
                messages: [{
                    sender: user.email,
                    session: 'none'
                }],
                currentTime: Date.now(),
                users: [user.email, chatObj.sendTo],
                receiverHasRead: false
            })

            
        }

        const userExist = await userExists();
        if (userExist) {
            const chatExist = await chatExists();
            console.log(chatExist, 'I exist')
            chatExist ? goToChat(newBuildDocKey()) : newChatSubmit({
                sendTo: selectedUser.email,                
            });
        }


    }

    const startSession = () => {
        
    }

    const endSession = () => {   
        

        const docKey = [user.email, chats[selectedChat].users.filter(_user => _user !== user.email)].sort().join(':');

        firebase.firestore().collection('chats').doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: user.email,                    
                    session: 'ended',
                    timestamp: Date.now()
                }),
                currentTime: Date.now(),
                receiverHasRead: false
            });
            
          
    }


    // <!-- new chat -->
  


    return (
        <div>
            
                <Grid
                    // className={useStyles.root}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.root}
                >
                    <Paper height="100%" borderRadius='30px 0 0 30px' width='30%' padding="0">
                        {
                            !chats ? (
                                <>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                </>
                            ) : chats.length === 0 ? (
                                <Box textAlign="center" paddingTop="100"> 
                                <Typography align="center" variant="body1"> Chats empty</Typography>
                                    {
                                        user.userType === 'Guest' ? (
                                            <Link href="/app/buddies">
                                                <a style={{textDecoration:'none'}}>
                                                    <Button
                                                    variant="contained"    
                                                    color="secondary"
                                                    size="small"
                                                    >
                                                        Go to Buddies page
                                                    </Button>
                                                </a>
                                            </Link>
                                        ) : (
                                            <Typography align="center" variant="body1"> You currently do not have messages from guests</Typography>
                                        )
                                    }
                                </Box>
                            ) :
                                (
                                    
                                    <ChatList
                                        user={user}
                                        history={props.history}
                                        selectChatFn={selectChat}
                                        newChatFn={newChatFn}
                                        chats={chats ? chats : null}
                                        selectedChatIndex={selectedChat}
                                    />
                                       

                                )
                        }

                    </Paper>
                    {/* <div > */}
                        <Box className={classes.chatContainer} ref={chatContainer} 
                        display='flex' flexDirection='column' justifyContent='flex-end' overflow="auto" position="relative" height='100%' borderRadius='0 30px 30px 0' width='70%' padding='0 3rem 3rem 3rem' >
                            {
                                loading ? (
                                    <Box marginTop={3}>
                                        <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                        <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                        <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    </Box>
                                ) :
                                    (
                                        chats !== undefined ?
                                            <ChatView 
                                                endBtn={
                                                    chats[selectedChat]?.messages[chats[selectedChat]?.messages?.length - 1].session === 'ended' ? true : false
                                                } 
                                                endSessionFn={endSession} 
                                                user={user.email} 
                                                chat={chats[selectedChat]} 
                                                submitMessage={submitMessage}
                                            /> 
                                            : <div> No chat available select a profile to chat with </div>
                                    )
                            }
                        </Box>
                    {/* </div> */}
                    
                    
                </Grid>

            
        </div>
    )
}

export default Sessions;