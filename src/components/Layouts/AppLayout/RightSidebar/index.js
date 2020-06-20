import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Drawer, Typography, Hidden } from '@material-ui/core'
import ProfileBox from '../ProfileBox'
import UpcomingBox from '../UpcomingBox'

const RightSidebar = props => {
    const { open, variant, onClose, className, ...rest } = props
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
                <ProfileBox />
                <UpcomingBox />
                <Hidden lgUp>
                    <Typography variant="body1" onClick={onClose} align="center" >{'close >>>'}</Typography>
                </Hidden>
            </div>
        </Drawer>
    )
}

RightSidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
}

export default RightSidebar
