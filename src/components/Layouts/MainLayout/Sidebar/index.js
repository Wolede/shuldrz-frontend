import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Drawer, Typography, Hidden } from '@material-ui/core'

const Sidebar = props => {
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
                menu
            </div>
        </Drawer>
    )
}

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
}

export default Sidebar