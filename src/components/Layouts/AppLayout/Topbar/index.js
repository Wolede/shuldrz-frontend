import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import { useStyles } from './style'
import MenuIcon from '@material-ui/icons/Menu';

const Topbar = props => {
    const { onLeftSidebarOpen, onRightSidebarOpen, ...rest } = props
    const classes = useStyles(props)


    return (
        <AppBar color="transparent" className={classes.root} {...rest}>
            <Toolbar disableGutters className={classes.toolBar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onLeftSidebarOpen}
                >
                    <MenuIcon />
                </IconButton>

                <div className={classes.title}>
                
                </div>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="profile menu"
                    onClick={onRightSidebarOpen}
                >
                    <MenuIcon />
                </IconButton>
                
            </Toolbar>
        </AppBar>
    )
}

Topbar.propTypes = {
    onLeftSidebarOpen: PropTypes.func,
    onRightSidebarOpen: PropTypes.func
}

export default Topbar
