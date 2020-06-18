import { useContext } from 'react'
import useAuth from 'contexts/Auth'
import { Button } from '@material-ui/core'

const Logout = () => {
    const { logout } = useAuth()

    const logoutHandler = () => {
        logout()
    }

    return (
        <div>
            <Button onClick={logoutHandler} variant="outlined" color="primary" size="small">Logout</Button>
        </div>
    )
}

export default Logout
