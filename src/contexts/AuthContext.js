import React, { createContext, useReducer, useEffect } from 'react'
import { AuthReducer } from '../reducers/AuthReducer'
import nookies from 'nookies'
import api from 'services/Api'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    // This context is used for authentication and the User object

    const token = nookies.get({}, 'token').token

    const initialState = typeof localStorage === "undefined" || localStorage === null ? null : ( localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {
        isAuthenticated : token ? true : false,
        token : token,
        isSuccessful: null,
        user: {}
    })


    console.log(initialState, 'initial');


    const [auth, dispatchAuth] = useReducer( AuthReducer, initialState )
    // const [auth, dispatchAuth] = useReducer( AuthReducer, {}, localState )
    console.log(auth, 'auth in context');

    useEffect(() => {
        // localForage.setItem('auth', auth).catch()
        localStorage.setItem('auth', JSON.stringify(auth))
    },[auth])

    return (
        <AuthContext.Provider value={{auth, dispatchAuth}}>
            { children }
        </AuthContext.Provider>
    )
}
export default AuthContextProvider