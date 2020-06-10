import { useContext } from 'react'
import Router from 'next/router'
import nookies from 'nookies'
import { AuthContext } from 'contexts/AuthContext'
import { Button } from '@material-ui/core'
import * as localForage from "localforage"

const Logout = () => {
    const { dispatchAuth } = useContext(AuthContext)

    const logoutHandler = () => {
        nookies.destroy(null, 'token')
        dispatchAuth({type: 'REMOVE_USER'})
        localForage.clear()
        Router.push('/')
    }

    return (
        <div>
            <Button onClick={logoutHandler} variant="outlined" size="small">Logout</Button>
        </div>
    )
}

export default Logout
