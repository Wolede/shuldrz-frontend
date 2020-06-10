import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button as MuiButton, CircularProgress } from '@material-ui/core'
import { useStyles } from './style'

const Button = ({ linkPage, variant, color, onClick, size, disabled, loading, type, children }) => {
    const classes = useStyles()
    
    // const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => {
    //     return (
    //     <Link href={href} as={hrefAs} prefetch>
    //       <a className={className}>
    //         {children}
    //       </a>
    //     </Link>
    // )}

    return (
        <MuiButton
        component={linkPage ? ButtonLink : undefined }
        href={linkPage}
        variant={variant ? variant : undefined}
        className={classes.button}
        color={color}
        onClick={onClick}
        size={size}
        disabled={disabled || loading}
        type={type}
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
    loading: PropTypes.bool
}

export default Button
