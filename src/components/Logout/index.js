import useAuth from 'contexts/Auth'
import { useStyles } from './style';
import { Button, Typography } from '@material-ui/core'
import { LogOut } from 'react-feather';

const Logout = () => {
    const { logout } = useAuth()
    const classes = useStyles()

    const logoutHandler = () => {
        logout()
    }

    return (
        <div style={{ textAlign: "center" }}>
            <Button onClick={logoutHandler} className={classes.button} size="small">
                <div 
                    className={classes.icon}
                >
                    <LogOut />
                </div>
                <Typography className={classes.menuText} >Logout</Typography>
            </Button>
        </div>
    )
}

export default Logout
