import PropTypes from 'prop-types'
import Link from 'next/link'
import { AppBar, Toolbar, ButtonBase, Hidden, Typography, useScrollTrigger, Fab, Zoom, Slide, Box, Container } from '@material-ui/core'
import { useStyles } from './style'
import MenuIcon from '@material-ui/icons/Menu';
import Button from 'components/Button'
import Paper from 'components/Paper'
import Logo from 'components/Logo'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


function HideOnScroll(props) {
    const { children } = props;
  
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

function ScrollTop(props) {
    const { children } = props;
    const classes = useStyles();

    const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    });

    const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#hero-front');

    if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    };
    
    return (
        <Zoom in={trigger}>
          <div onClick={handleClick} role="presentation" className={classes.scroll}>
            {children}
          </div>
        </Zoom>
    );
}




const Header = (props) => {
    const { className, onSidebarOpen, isLight, ...rest } = props;
    const classes = useStyles();

    return (
        <>
        <HideOnScroll {...props}>
        <AppBar color="transparent" className={classes.root} {...rest}>
        <Container maxWidth="xl">
            <Toolbar disableGutters className={classes.toolBar}>
                <div className={classes.title}>
                    <Box width='9rem'>
                        <Link href="/">
                            <a>
                                <Logo />
                            </a>
                        </Link>
                    </Box>
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
                                Become a Buddy 
                            </Typography>
                        </a>
                    </Link>
                    <Link 
                        href="/wall"      
                    >
                        <a className={classes.menuLink}>
                            <Typography
                                variant="body2"
                                className={isLight ? classes.lightText : null}
                            >
                                Wall
                            </Typography>
                        </a>
                    </Link>

                    {/* <Link 
                        href="#"      
                    >
                        <a className={classes.menuLink}>
                            <Typography
                                variant="body2"
                                className={isLight ? classes.lightText : null}
                            >
                                Donate 
                            </Typography>
                        </a>
                    </Link> */}

                    <Link 
                        href="/faq"      
                    >
                        <a className={classes.menuLink}>
                            <Typography
                                variant="body2"
                                className={isLight ? classes.lightText : null}
                            >
                                FAQ 
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
                    <ButtonBase
                        focusRipple
                        className={classes.imageButton}
                        focusVisibleClassName={classes.imageButton}
                        onClick={onSidebarOpen}
                        style={{
                            borderRadius: '1.25rem',
                            boxShadow: '0px 15px 20px rgba(0, 199, 102, 0.20)'
                        }}
                    >
                        <Paper padding='.8rem .8rem .6rem .8rem' borderRadius="1.25rem" color="primary">
                            <MenuIcon />
                        </Paper>
                    </ButtonBase>
                </Hidden>
            </Toolbar>
        </Container>
        </AppBar>
        </HideOnScroll>

        <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
            </Fab>
        </ScrollTop>
        </>
    )
}

Header.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
    isLight: PropTypes.bool
};

export default Header
