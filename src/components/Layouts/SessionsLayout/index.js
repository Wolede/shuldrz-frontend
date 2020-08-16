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
    

    // Sidebar stuff
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openLeftSidebar, setOpenLeftSidebar] = useState(false);

    const handleLeftSidebarOpen = () => {
      setOpenLeftSidebar(true);
    };
  
    const handleLeftSidebarClose = () => {
      setOpenLeftSidebar(false);
    };

    const shouldOpenLeftSidebar = isDesktop ? true : openLeftSidebar;


    
    
    const [selectedChat, updateSelectedChat] = useState()
    const [selectedUser, setSelectedUser] = React.useContext(SelectedUserContext)
    const [chatReceiverID, setChatReceiverID] = useState()
    const [prevReview, setPrevReview] = useState()
    const [chats, setChats] = React.useContext(ChatContext)
    const [chatExist, setChatExist] = useState(false)
    let chatNotEmpty

    const newChatFn = () => {
        console.log('new chat clicked')
    }


    const chatContainer = useRef()
    const scrollToMyRef = () => {
        const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll)
    }

    useEffect(() => {


        if (user !== null || undefined) {  
            const userImage = user.profileImage ? user.profileImage.url : null
                   
                   

            firebase.firestore().collection('chats').where('users', 'array-contains', user.username).orderBy('currentTime', 'desc')
            .onSnapshot(res => {
                const firebase_chats = res.docs.map(doc => doc.data())    
                chatNotEmpty = firebase_chats.filter(chatList => {
                    return chatList.messages.length > 1
                })

                console.log('CHATLIST THAT ARE NOT EMPTY', chatNotEmpty)
                setChats(firebase_chats)                 
                console.log(firebase_chats)
            })              
            
        }

        if (selectedUser) {           
            submitNewChat()            
        }
         
        

    }, [user]);

    useEffect(()=> {
        let messaging 

        if (process.browser){
            messaging = firebase.messaging()
            messaging.requestPermission()
            .then(() => {
                console.log('Have Permission')
            })
        }
    })
     

    const selectChat = (chatIndex) => {  
        updateSelectedChat(chatIndex)

        console.log('USERNAME', user.username)
        // messageRead(chatIndex);    
        const chatReceiver = chats[chatIndex].users.filter(_usr => _usr !== user.username)[0]
        
        firebase.firestore().collection('users').get().then((snapshot) => {
            snapshot.docs.map(doc => userInfo(doc))
        })

        const userInfo = (doc) =>{             
           doc.data().username === chatReceiver ? setChatReceiverID(doc.data().id) : null                
        } 
       
    }



    useEffect(() => {
        // console.log('CHAT RECEIVER ID', chatReceiverID)
        const getUserInfo = async() => {            
            try{
                const { data } = await api.get(`/users/${chatReceiverID}`)           
                
                // console.log('USER INFO', data)               
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
            const res= await api.get(`/reviews?names=${user.username}%20left%20${selectedUser.username}%20a%20review`)            
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
        const sessionState = chats[selectedChat].messages.length === 0 ? [] : 
        chats[selectedChat].messages[chats[selectedChat].messages.length - 1].session

        const session = sessionState === 'ended' || sessionState === 'none' || sessionState.length === 0 ? 'started' : sessionState === 'started' ? 'continuing' : 'continuing'
        
        const docKey = buildDocKey((chats[selectedChat]).usersDetails.filter(_usr => _usr.userId !== user.id)[0].userId)     
        console.log('DOCUMENT KEY', docKey)   
       
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
    }, [chats, selectedChat])

    

    const clickedMessageWhereNotSender = (chatIndex) =>  {
        return chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== user.username        
    }

    const messageRead = (chatIndex) => {
       
        const docKey = buildDocKey(chats[selectedChat]).usersDetails.filter(_usr => _usr.userId !== user.id)[0].userId;   
        
        if (clickedMessageWhereNotSender(chatIndex)) {
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
            const chat = chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
            updateSelectedChat(chats.indexOf(chat));
            selectChat(chats.indexOf(chat))
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
            if(chatExist){
                setChatExist(true)
                goToChat(tempDocKey())
            } else {
                newChatSubmit()
            }  
            
        }


    }

    const userInputFn = () => {
        // messageRead(chatIndex)
    }

    const endSession = async () => {           

        const docKey = [user.id, chats[selectedChat].usersDetails.filter(_usr => _usr.userId !== user.id)[0].userId].sort().join('')

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
        if (chats[selectedChat]?.messages[chats[selectedChat]?.messages.length - 1].session ==='none'){
            return true
        } 
         else if (chats[selectedChat]?.messages[chats[selectedChat]?.messages.length - 1].session ==='ended'){
            return true
       } else {
           return false
       }
    }

    const deleteMessage = async (i) => {
        const docKey = [user.id, selectedUser.id].sort().join('')
        const doc = await firebase.firestore().collection('chats').doc(docKey).get()
        let messages = doc.data().messages
        let editMessage
        
        editMessage =  {
            sender: messages[i].sender,
            message: messages[i].message,
            session: messages[i].session,
            timestamp: messages[i].timestamp,
            isDeleted: true
        }   
              
        messages[i] = editMessage
        console.log('MESSAGES INDEX', messages)
    
        return doc.ref.update({
            "messages": firebase.firestore.FieldValue.arrayRemove({})
        })
        .then(() => {
            doc.ref.update({
                messages
            })
         })
         .catch(function(error) {
        // The document probably doesn't exist.
        console.error(error);
         });
        
        
    }

    

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
                            !chats ? (
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
                                        newChatFn={newChatFn}
                                        chats={chats ? chats : null}
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
                                            endBtn={btnDisabled}                                
                                            endSessionFn={endSession} 
                                            user={user} 
                                            deleteMessage={deleteMessage}
                                            chatList={chatNotEmpty}
                                            chat={chats[selectedChat]} 
                                            submitMessage={submitMessage}
                                            volunteer={selectedUser}
                                            prevReview={prevReview}
                                        /> 
                                        : (
                                            <div style={{
                                                display:"flex",
                                                justifyContent:"center",
                                                flexDirection: "column",
                                                alignItems:"center",
                                                height:"inherit"
                                                }}
                                            >
                                                {
                                                    user.userType === 'Guest' ? (
                                                        <Typography align="center" variant="body1"> You currently do not have any message</Typography>
                                                    ) : (
                                                        <Typography align="center" variant="body1"> You currently do not have messages from guests</Typography>
                                                    )
                                                }   
                                                    
                                                    
                                                <Link href="/app/buddies">
                                                    <a style={{textDecoration:'none'}}>
                                                        <Button
                                                        variant="contained"    
                                                        color="error"
                                                        size="small"
                                                        >
                                                            Go to Buddies page
                                                        </Button>
                                                    </a>
                                                </Link> 
                    
            
                                            </div>
                                        )
                                        
                                )
                        }
                    </Box>
                    
                    
                </Grid>

            
        </div>
    )
}

export default Sessions;