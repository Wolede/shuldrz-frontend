// const firebase = require("firebase");
// require("firebase/firestore");
// import React, {useContext} from 'react'
// import {SessionContext} from 'contexts/SessionContext'




export const sendUserDataToFirestore = (user) => {
    const userObj = {
        email: user.email
    };

    firebase.firestore().collection('users').doc(user.email).set(userObj)
    .then(() => {
        // console.log('logged user')
    }, err => {
        // console.log('user not stored:' + err)
    }
        
    )
}

const {dispatchChats} = useContext(SessionContext)

export const getChatList = async (user) => {
    await firebase.firestore().collection('chats').where('users', 'array-contains', user.email)
    .onSnapshot(async res => {        
        // res.docs.map(doc => doc.data())  
        dispatchChats({type: 'GET_CHATS', chats: res.docs}) 
    
    })  
    
}