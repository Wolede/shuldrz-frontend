import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Slide } from '@material-ui/core'

const MiniDrawer = props => {
    const { open, direction, children, ...rest } = props
    const classes = useStyles(props)

    return (
        <Slide
        direction={direction} 
        in={open} 
        mountOnEnter 
        unmountOnExit
        // onClose={onClose}
        >
            <div className={classes.root}>
            { children }
            </div>
        </Slide>
    )
}

MiniDrawer.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    direction: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    backgroundPaper: PropTypes.bool
}

export default MiniDrawer
