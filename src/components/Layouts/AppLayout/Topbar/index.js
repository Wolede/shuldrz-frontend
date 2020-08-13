import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Slide, useScrollTrigger, ButtonBase } from '@material-ui/core'
import { useStyles } from './style'
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import useAuth from 'contexts/Auth'

function HideOnScroll(props) {
    const { children } = props;
  
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

const Topbar = props => {
    const { onLeftSidebarOpen, onRightSidebarOpen, withRightSidebar, ...rest } = props
    const classes = useStyles(props)
    const { user } = useAuth()


    return (
        <HideOnScroll {...props}>
        <AppBar color="transparent" className={classes.root} {...rest}>
            <Toolbar disableGutters className={classes.toolBar}>
                <ButtonBase
                    focusRipple
                    className={classes.imageButton}
                    focusVisibleClassName={classes.imageButton}
                    onClick={onLeftSidebarOpen}
                >
                    <Paper padding='.8rem .8rem .6rem .8rem' borderRadius="1.25rem" color="secondary">
                        <MenuIcon />
                    </Paper>
                </ButtonBase>
                <div className={classes.title}>
                
                </div>
                { withRightSidebar === true && (
                    <ButtonBase
                        focusRipple
                        className={classes.imageButton}
                        focusVisibleClassName={classes.imageButton}
                        onClick={onRightSidebarOpen}
                    >
                        <Avatar 
                            alt="lol" 
                            src={user?.profileImage ? user.profileImage.url : null}
                            size="tiny" 
                        />
                    </ButtonBase>
                )}
                
                
            </Toolbar>
        </AppBar>
        </HideOnScroll>
    )
}

Topbar.propTypes = {
    onLeftSidebarOpen: PropTypes.func,
    onRightSidebarOpen: PropTypes.func
}

export default Topbar
