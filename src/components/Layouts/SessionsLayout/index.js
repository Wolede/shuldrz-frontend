import React, { useState, useEffect, useRef } from 'react'
import { Grid, Box, Typography, useMediaQuery, Hidden } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
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
import MiniDrawer from '../../MiniDrawer';
import useSWR from 'swr'
import api from 'services/Api'

const firebase = require("firebase/app");



const Sessions = (props) => {
    const classes = useStyles()
    
    const { user, loading } = useAuth()

    // request user permissions to display desktop notifications
    useEffect(() => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
          } else {
            Notification.requestPermission();
          }
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/push-sw.js')
        }
    }, [])

    // Sidebar stuff
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openLeftSidebar, setOpenLeftSidebar] = useState(true);

    const handleLeftSidebarOpen = () => {
      setOpenLeftSidebar(true);
    };
  
    const handleLeftSidebarClose = () => {
      setOpenLeftSidebar(false);
    };

    const shouldOpenLeftSidebar = isDesktop ? true : openLeftSidebar;


    
    // const [chats, updateChatList] = useState()
    const [selectedChat, updateSelectedChat] = useState(0)
    const [selectedUser, setSelectedUser] = React.useContext(SelectedUserContext)
    const [chatProfileInfo, setChatProfileInfo] = useState()
    const [chatReceiverID, setChatReceiverID] = useState()
    const [chats, setChats] = React.useContext(ChatContext)
    const [chatExist, setChatExist] = useState(false)
    const [prevReview, setPrevReview] = useState()
    let chatNotEmpty

   

    const chatContainer = useRef()
    const scrollToMyRef = () => {
        const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll)
    }

    useEffect(() => {

        if (user) {  
            const userImage = user.profileImage ? user.profileImage.url : null
                   
            firebase.firestore().collection('chats').where('users', 'array-contains', user.username).orderBy('currentTime', 'desc')
            .onSnapshot(res => {
                const firebase_chats = res.docs.map(doc => doc.data())  
                console.log('FIREBASE CHATS', firebase_chats)  
                chatNotEmpty = firebase_chats.filter((chatList, i) => {
                    return chatList.messages.length > 1 || chatList.messages[0].sender  === user.username 
                })
                setChats({ loading: false, data: firebase_chats ? firebase_chats : [] })     
            })       

        }

    }, [user]);

    // useEffect(() => {
    //     console.log('set this one', selectedUser)
    //     if(selectedUser) {
    //         setChatReceiverID(selectedUser.id)
    //     }
    // }, [])

    //call submitNewChat only when the chats array is not empty anymore
    useEffect(() => {

        
        if( !selectedUser ){
            console.log('war', selectedUser)
            setChatReceiverID(chats.data[selectedChat]?.usersDetails?.find(_usr => _usr.userId !== user.id)?.userId)
        }
                
        console.log('present chat', chats)
        if (selectedUser && !chats.loading) {                  
            submitNewChat()                        
        }

    }, [chats.loading])

    // useEffect(()=> {
    //     let messaging 

    //     if (process.browser){
    //         messaging = firebase.messaging()
    //         messaging.requestPermission()
    //         .then(() => {
    //             console.log('Have Permission')
    //         })
    //     }
    // })

   console.log('chats', chats, selectedUser)
    

    const selectChat = (chatIndex) => {  
        updateSelectedChat(chatIndex)         
        const chatReceiver = chats.data[chatIndex]?.users.filter(_usr => _usr !== user.username)[0]

        firebase.firestore().collection('users').get().then((snapshot) => {
            snapshot.docs.map(doc => userInfo(doc))
        })
        const userInfo = (doc) =>{             
           doc.data().username === chatReceiver ? setChatReceiverID(doc.data().id) : null                
        }        
    }

    // useEffect(() => {
    //     messageRead()
    // }, [selectedChat])
    
    // useEffect(() => {
    //     if( !selectedUser ){
    //         setChatReceiverID(chats[selectedChat]?.usersDetails?.find(_usr => _usr.userId !== user.id)?.userId)
    //     }

    //     // if(selectedUser) {
    //     //     setChatReceiverID(selectedUser.id)
    //     // }
        
    // }, [chats.length])

   
    useEffect(() => {
        // console.log('CHAT RECEIVER ID', chatReceiverID)
        const getUserInfo = async() => {            
            try{
                const { data } = await api.get(`/users/${chatReceiverID}`)           
                
                // console.log('USER INFO', data)   
                console.log('kini', chatReceiverID, data)            
                setSelectedUser(data)
            } catch(error){
                console.log(error)
            }                
        }
        
        if(chatReceiverID){
            getUserInfo()
        }
        
    }, [chatReceiverID])
  

    const loadPrevReview = async() => {
        try {            
            const res= await api.get(`/reviews?names=${user?.username}%20left%20${selectedUser?.username}%20a%20review`)            
            setPrevReview(res.data[0])                             
        }catch(error) {
            console.log(error)
        }        
    }

    useEffect(() => {       
        loadPrevReview()
    }, [selectedUser])

    const buildDocKey = (friend) => [user.id, friend].sort().join('');


    const submitMessage = (msg) => {
        // console.log('submitMessageChats', selectedChat.messages.length)
        const sessionState = chats.data[selectedChat].messages.length === 0 ? [] : 
        chats.data[selectedChat].messages[chats.data[selectedChat].messages.length - 1].session

        let session;
        if (!chats.data[selectedChat].groupName) {
            session = sessionState === 'ended' || sessionState === 'none' || sessionState.length === 0 ? 'started' : sessionState === 'started' ? 'continuing' : 'continuing'
        } else {
            session = null;
        }

        let docKey;
        if (!chats.data[selectedChat].groupName) {
            docKey = buildDocKey((chats.data[selectedChat]).usersDetails.filter(_usr => _usr.userId !== user.id)[0].userId)     
        } else {
            docKey = chats.data[selectedChat].docKey
        }
 
        firebase.firestore().collection('chats').doc(docKey)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: user.username,
                message: msg,
                session: session,
                timestamp: Date.now(),
                isDeleted: false
            }),
            currentTime: Date.now(),
            receiverHasRead: false
        }); 

        updateSelectedChat(0)       
        
    }

    useEffect(() => {
        scrollToMyRef()
        if (chats) {
            btnDisabled()
        }
    }, [chats.data, selectedChat])

    

    const clickedMessageWhereNotSender = (selectedChat) =>  {        
        return chats.data[selectedChat]?.messages[chats.data[selectedChat]?.messages?.length - 1]?.sender !== user?.username        
    }

    const userClickedInputFn = () => {
        messageRead()
        console.log('you clicked input')
    }

    const messageRead = () => {               
        const selectedUserID = chats.data[selectedChat]?.usersDetails?.find(_usr => _usr.userId !== user.id)?.userId
        const docKey = [user?.id, selectedUserID].sort().join('');   
        
        if (clickedMessageWhereNotSender(selectedChat)) {
            firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({ receiverHasRead: true });
        } 
    }



    // <!-- Submit new chat when user cliks on the chat button on a profile --> 
    const submitNewChat = async () => {

        const newBuildDocKey = () =>  [user.id, selectedUser.id].sort().join('');
        const tempDocKey = () =>  [user.username, selectedUser.username].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).join(':');
        
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
            return chat.exists;
        }

        const goToChat = (docKey) => {
            const usersInChat = docKey.split(':');
            const chat = chats.data.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
            updateSelectedChat(chats.data.indexOf(chat));
        }

        const newChatSubmit = async () => {            
            const docKey = newBuildDocKey();  
            const userImage = user.profileImage ? user.profileImage.url : null
            const selectedUserImage = selectedUser.profileImage ? selectedUser.profileImage.url : null
            
            await 
            firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .set({
                messages: [{
                    sender: user.username,
                    session: 'none',                    
                }],                
                currentTime: Date.now(),
                users: [user.username, selectedUser.username],
                usersDetails: [
                    {
                        userId: user.id,
                        image: userImage
                    },
                    {   
                        userId: selectedUser.id,
                        image: selectedUserImage
                    }
                ],
                receiverHasRead: false
            })

            
        }

        const userExist = await userExists();
        if (userExist) {
            const chatExist = await chatExists();

            // console.log('we here', chatExist, 
            //                         userExist, 
            //                         selectedChat,
            //                         chats.data[selectedChat]?.messages?.length > 1, 
            //                         chats.data.find(chat => chat.usersDetails.some(_user => _user.userId === selectedUser.id)),
            //                         selectedUser,
            //                         chats.data[0].usersDetails.some(_user => _user.userId === selectedUser.id)
            // )

            if(chatExist && chats.data.find(chat => chat.usersDetails.some(_user => _user.userId === selectedUser.id))?.messages?.length > 1){              
                setChatExist(true)
                goToChat(tempDocKey())
            } else {
                newChatSubmit()
            }    
          
        }


    }


    
   
    const endSession = async () => {           

        const docKey = [user.id, chats.data[selectedChat].usersDetails.filter(_usr => _usr.userId !== user.id)[0].userId].sort().join('')

        firebase.firestore().collection('chats').doc(docKey)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                sender: user.username,                    
                session: 'ended',
                timestamp: Date.now()
            }),
            currentTime: Date.now(),
            receiverHasRead: false
        })

        try{
            const res = await api.post(`session-logs`, {
                user: user.id, 
                sessionUser: selectedUser.id
            })
            
        } catch (error){
            console.log(error)
        }          
    }

    const btnDisabled = () => {
        if (chats.data[selectedChat]?.messages[chats.data[selectedChat]?.messages.length - 1].session ==='none'){
            return true
        } 
         else if (chats.data[selectedChat]?.messages[chats.data[selectedChat]?.messages.length - 1].session ==='ended'){
            return true
       } else {
           return false
       }
    }

    const deleteMessage = async (timestamp) => {
        const selectedUserID = chats.data[selectedChat]?.usersDetails?.find(_usr => _usr.userId !== user.id)?.userId
        
        let docKey;
        if (!chats.data[selectedChat].groupName){
            docKey = [user.id, selectedUserID].sort().join('')
        } else {
            docKey = chats.data[selectedChat].docKey
        }
        
        console.log('DOCKEY', docKey)
        const doc = await firebase.firestore().collection('chats').doc(docKey).get()
        let messages = doc.data().messages
        
        const newMessages = messages.reduce((acc, curr) => {
            
            if ( curr.timestamp === timestamp ) {
                curr = {
                    ...curr,
                    isDeleted: true
                }
            }
            acc.push(curr)
            return acc;
        }, [])
              

        return doc.ref.update({
            "messages": firebase.firestore.FieldValue.arrayRemove({})
        })
        .then(() => {
            doc.ref.update({
                messages: newMessages
            })
         })
         .catch(function(error) {
            // The document probably doesn't exist.
            console.error(error);
         });
    }

    console.log('selectedUser', selectedUser, chats)

    // <!-- new chat -->
  

    return (
        <div>
            
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.root}
                >
                    <MiniDrawer
                        direction='right'
                        open={shouldOpenLeftSidebar}
                        width={isDesktop ? '30%' : '100%'}
                        backgroundPaper
                        overflow='auto'
                    >
                    <Paper height="100%" width='100%' padding="0">
                        {
                            chats.loading ? (
                                <>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                </>
                            ) : 
                                (
                                    
                                    <ChatList
                                        user={user}
                                        history={props.history}
                                        selectChatFn={selectChat}
                                        closeChatList={handleLeftSidebarClose}                                        
                                        chats={ chats.data }
                                        selectedChatIndex={selectedChat}
                                        chatExist={chatExist}
                                    />                                      

                                )
                        }

                    </Paper>
                    </MiniDrawer>
                    <Box 
                        className={classes.chatContainer} 
                        ref={chatContainer} 
                        display={!isDesktop && shouldOpenLeftSidebar ? 'none' : 'flex'} 
                        flexDirection='column' 
                        justifyContent='flex-end' 
                        overflow="auto" 
                        position="relative" 
                        height='100%' 
                        borderRadius={isDesktop ? '0 1.875rem 1.875rem 0' : '1.875rem'}  
                        width={isDesktop ? '70%' : '100%'} 
                        padding={isDesktop ? '1.5rem 3rem 3rem 3rem' : '1rem 1rem 1rem 1rem'}
                    >
                        {
                            chats.loading ? (
                                <Box marginTop={3}>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                    <Box marginBottom={1}> <Skeleton variant="rect" height={180} animation="wave" /> </Box>
                                </Box>
                            ) :
                                (
                                    chats.data.length  ?
                                        <ChatView 
                                            endBtn={btnDisabled}
                                            backBtn={handleLeftSidebarOpen}
                                            endSessionFn={endSession} 
                                            selectedChatIndex={selectedChat}
                                            userClickedInput={userClickedInputFn}
                                            user={user} 
                                            deleteMessage={deleteMessage}
                                            chatList={chats.data}
                                            chat={chats.data[selectedChat]} 
                                            submitMessage={submitMessage}
                                            selectedUser={selectedUser}
                                            prevReview={prevReview}
                                        /> 
                                        : 
                                    null                                        
                                )
                        }
                    </Box>
                    
                    
                </Grid>

            
        </div>
    )
}

export default Sessions;