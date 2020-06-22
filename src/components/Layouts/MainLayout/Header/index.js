import PropTypes from 'prop-types'
import Link from 'next/link'
import { AppBar, Toolbar, IconButton, Hidden, Typography } from '@material-ui/core'
import { useStyles } from './style'
import MenuIcon from '@material-ui/icons/Menu';
import Button from 'components/Button'
const Header = (props) => {
    const { className, onSidebarOpen, isLight, ...rest } = props;
    const classes = useStyles();

    return (
        <AppBar color="transparent" className={classes.root} {...rest}>
            <Toolbar disableGutters className={classes.toolBar}>
                <div className={classes.title}>
                    <Link href="/">
                        <a>
                            <img
                                className={classes.logo}
                                alt="Shuldrz-logo"
                                src="https://uploads-ssl.webflow.com/5d9d02c4b01a536c7d5d4a35/5eb98d6936a3e82bd0e8812b_deliveroo-logo.png"
                            />
                        </a>
                    </Link>
                </div>

                <Hidden smDown>
                    <Link 
                        href="/volunteer-signup"      
                    >
                        <a className={classes.menuLink}>
                            <Typography
                                variant="body2"
                                className={isLight ? classes.lightText : null}
                            >
                                Volunteer 
                            </Typography>
                        </a>
                    </Link>

                    <Link 
                        href="/"      
                    >
                        <a className={classes.menuLink}>
                            <Typography
                                variant="body2"
                                className={isLight ? classes.lightText : null}
                            >
                                Donate 
                            </Typography>
                        </a>
                    </Link>
        
                    <Link 
                        href="/login"
                    >
                        <a className={classes.menuLink} style={{ marginLeft: '2rem' }}>
                            <Typography
                                variant="body2"
                                className={isLight ? classes.lightText : null}
                            >
                                Login 
                            </Typography> 
                        </a>
                    </Link>
                    
                    <Link 
                        href="/signup"
                    >
                        <a className={classes.menuButton}>
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                Sign up    
                            </Button> 
                        </a>
                    </Link>
                </Hidden>

                <Hidden mdUp>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onSidebarOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

Header.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
    isLight: PropTypes.bool
};

export default Header
