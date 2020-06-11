import React, { createContext, useReducer, useEffect } from 'react'
import { AuthReducer } from '../reducers/AuthReducer'
import nookies from 'nookies'
import * as localForage from "localforage"

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    // This context is used for authentication and the User object

    const token = nookies.get({}, 'token').token

    const localState = async () => {
        try {
            const value = await localForage.getItem('auth')

            const initialState = value ? value : {
                isAuthenticated : token ? true : false,
                token : token,
                isSuccessful: null,
                user: {}
            }        
            
            return initialState
        } catch (error){
            // stuff
        }
    }

    const [auth, dispatchAuth] = useReducer( AuthReducer, {}, localState )
    console.log(auth, 'auth in context');

    useEffect(() => {
        localForage.setItem('auth', auth).catch()
    },[auth])
    return (
        <AuthContext.Provider value={{auth, dispatchAuth}}>
            { children }
        </AuthContext.Provider>
    )
}
export default AuthContextProvider