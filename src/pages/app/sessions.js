import React, { useState, useEffect, useRef } from 'react'
import { Grid, makeStyles, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import ChatList from 'components/ChatList'
import ChatView from 'components/ChatView'
import ChatInput from 'components/ChatInput'
import Head from 'next/head'
import { ProtectRoute } from '../../contexts/Auth'
import useAuth from 'contexts/Auth'
import { SelectedUserContext } from 'contexts/SelectedUserContext';
import { ChatContext } from 'contexts/ChatContext';

const firebase = require("firebase");



const Sessions = (props) => {

    const useStyles = makeStyles(theme => ({
        root: {
            width: `100%`,
        },

    }))
    const { user, loading } = useAuth()

    // const [chats, updateChatList] = useState()
    const [selectedChat, updateSelectedChat] = useState()    

    const [selectedUser, setSelectedUser] = React.useContext(SelectedUserContext)
    const [chats, setChats] = React.useContext(ChatContext)

    const newChatFn = () => {
        console.log('new chat clicked')
    }

    // function scrollToEnd(){
    //     var chatList = document.getElementById("chatview-container");
    //     chatList.scrollTop = chatList.scrollHeight;
    // }

    useEffect(() => {

        if (user !== null || undefined) {
           

            firebase.firestore().collection('chats').where('users', 'array-contains', user.email)
            .onSnapshot(res => {
                const firebase_chats = res.docs.map(doc => doc.data())
                setChats(firebase_chats)
                // updateSelectedChat(firebase_chats.length-firebase_chats.length) 

            })
           
            
            
            // scrollToEnd()
        }

        if (selectedUser) {           
            submitNewChat()            
        }


        if (selectedChat) {
            messageRead();
        }

        
        console.log('sessions message', selectedUser);


    }, [user, selectedChat]);

  

    const buildDocKey = (friend) => [user.email, friend].sort().join(':');

    const submitMessage = (msg) => {
        const docKey = buildDocKey((chats[selectedChat]).users.filter(_usr => _usr !== user.email)[0])
        firebase.firestore().collection('chats').doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: user.email,
                    message: msg,
                    timestamp: Date.now()
                }),
                receiverHasRead: false
            });
    }



    const selectChat = async (chatIndex) => {

        await updateSelectedChat(chatIndex)
    }

    const clickedMessageWhereNotSender = (chatIndex) => chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== user.email;

    const messageRead = () => {
        console.log(chats)
        const chatIndex = selectedChat === -1 ? 0 : selectedChat ;
        console.log(chatIndex)
        const docKey = buildDocKey(chats[chatIndex].users.filter(_usr => _usr !== user.email)[0]);
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
                message: chatObj.message,
                sender: user.email
                }],
                users: [user.email, chatObj.sendTo],
                receiverHasRead: false
            })

            selectChat(chats.length - 1);
        }

        const userExist = await userExists();
        if (userExist) {
            const chatExist = await chatExists();
            console.log(chatExist, 'I exist')
            chatExist ? goToChat(newBuildDocKey()) : newChatSubmit({
                sendTo: selectedUser.email,
                message: 'Hello'
            });
        }


    }




    // <!-- new chat -->
  


    return (
        <div>
            <Head>
                <title>Shuldrz | Sessions</title>
            </Head>
            <AppLayout>
                <Grid
                    // className={useStyles.root}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={useStyles.root}
                >
                    <Paper height='95vh' borderRadius='30px 0 0 30px' width='30%' padding="0">
                        {
                            loading ? (
                                <>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                </>
                            ) :
                                (
                                    chats ?
                                        <ChatList
                                            user={user}
                                            history={props.history}
                                            selectChatFn={selectChat}
                                            newChatFn={newChatFn}
                                            chats={chats ? chats : null}
                                            selectedChatIndex={selectedChat}
                                        />
                                        : (
                                            <>
                                                <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                                <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                                <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                            </>
                                        )

                                )
                        }

                    </Paper>
                    <Paper overflow="auto" height='95vh' borderRadius='0 30px 30px 0' width='70%' color="secondary" padding='0 3rem 3rem 3rem'>
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
                                        <ChatView user={user.email} chat={chats[selectedChat]} /> : <div> No chat available select a profile to chat with </div>
                                )
                        }
                    </Paper>
                    <ChatInput submitMessageFn={submitMessage} />
                </Grid>

            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Sessions)
