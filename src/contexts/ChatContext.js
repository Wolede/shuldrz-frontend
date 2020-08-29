import React, { useState, createContext } from 'react'

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [ chats, setChats ] = useState({ loading: true, data: [] })
    // console.log(chats, 'incontext');
    
    return (
        <ChatContext.Provider value={[chats, setChats]}>
            { children }
        </ChatContext.Provider>
    )
}

export default ChatContextProvider