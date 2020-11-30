import PropTypes from 'prop-types'
import { Button as MuiButton, CircularProgress } from '@material-ui/core'
import { useStyles } from './style'

const Button = (props) => {
    const { linkPage, variant, color, onClick, size, disabled, loading, type, startIcon, endIcon, children } = props
    const classes = useStyles(props)

    // Only Primary and Secondary is allowed in the color prop so we're mitigating for that 
    let coloured;
    const primaryOrSecondaryColor = () => {
        if (color === 'primary' || color === 'secondary') {
            coloured = color
        } else {
            coloured = 'inherit'
        }
    }
    primaryOrSecondaryColor()
    
    return (
        <MuiButton
        component={linkPage ? ButtonLink : undefined }
        variant={variant ? variant : undefined}
        className={classes.button}
        color={coloured}
        onClick={onClick}
        size={size}
        disabled={disabled || loading}
        type={type}
        startIcon={startIcon}
        endIcon={endIcon}
        >
            { children }
            {loading && 
                <CircularProgress size={24} className={classes.buttonProgress}/>
            }
        </MuiButton>
    )
}

Button.propTypes = {
    linkPage: PropTypes.string,
    to: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    type: PropTypes.string,
    startIcon: PropTypes.any,
    endIcon: PropTypes.any,
    loading: PropTypes.bool,
    marginTop: PropTypes.string,
    marginBottom: PropTypes.string,
}

export default Button;
