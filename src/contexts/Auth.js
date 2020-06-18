import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import Router, { useRouter } from 'next/router'

//api here is an axios instance
import api from 'services/Api'


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid", token)
                api.defaults.headers.Authorization = `Bearer ${token}`
                const { data: user } = await api.get('users/me')
                if (user) setUser(user);
            }
            setLoading(false)
            console.log('over here')
        }
        loadUserFromCookies()
    }, [])

    const logout = (identifier, password) => {
        Cookies.remove('token')
        setUser(null)
        window.location.pathname = '/login'
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



export default function useAuth() {
    const context = useContext(AuthContext)

    return context
};


export function ProtectRoute(Component) {
    return () => {
        const { user, isAuthenticated, loading } = useAuth();
        const router = useRouter()

        useEffect(() => {
            if (!isAuthenticated && !loading) Router.push('/login')
        }, [loading, isAuthenticated])

        return (<Component {...arguments} />)
    }
}