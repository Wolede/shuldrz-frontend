import { useContext } from 'react'
import Router from 'next/router'
import nookies from 'nookies'
import { AuthContext } from 'contexts/AuthContext'
import { Button } from '@material-ui/core'

const Logout = () => {
    const { dispatchAuth } = useContext(AuthContext)

    const logoutHandler = () => {
        nookies.destroy(null, 'token')
        dispatchAuth({type: 'REMOVE_USER'})
        localStorage.clear()
        Router.push('/login')
    }

    return (
        <div>
            <Button onClick={logoutHandler} variant="outlined" color="primary" size="small">Logout</Button>
        </div>
    )
}

export default Logout
