import React, { createContext, useReducer } from 'react';
import { SessionReducer } from '../reducers/SessionReducer'
export const SessionContext = createContext();

const SessionContextProvider = ({children}) => {
    // console.log('hey');
    const [chats, dispatchChats] = useReducer(SessionReducer, [])
    // console.log(chats, 'chats in context');

    return (
        <SessionContext.Provider value={{chats, dispatchChats}}>
            { children }            
        </SessionContext.Provider>
    )
}

export default SessionContextProvider
