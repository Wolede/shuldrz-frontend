import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Drawer, Hidden, Fab } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import ProfileBox from '../ProfileBox'
import UpcomingBox from '../UpcomingBox'
import AvailabilityBox from '../AvailabilityBox';

const RightSidebar = props => {
    const { open, variant, onClose, className, otherUser, ...rest } = props
    const classes = useStyles(props)

    return (
        <Drawer
        anchor="right"
        onClose={onClose}
        open={open}
        variant={variant}
        classes={{ paper: classes.drawer }}
        >
            <div
            {...rest}
            className={classes.root}
            >
                <ProfileBox otherUser={otherUser}/>
                {!otherUser ? (
                    <UpcomingBox />
                ) : (
                    <AvailabilityBox/>
                )

                }
                
                <Hidden lgUp>
                    <Fab 
                        size="small" 
                        aria-label="back" 
                        color='secondary' 
                        onClick={onClose} 
                        className={classes.closeIcon}
                        >
                        <CloseIcon />
                    </Fab>
                </Hidden>
            </div>
        </Drawer>
    )
}

RightSidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
    otherUser: PropTypes.string
}

export default RightSidebar
