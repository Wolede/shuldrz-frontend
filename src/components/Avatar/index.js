import PropTypes from 'prop-types'
import { Avatar as MuiAvatar } from '@material-ui/core'
import { useStyles } from './style'
import BadgeUserType from '../BadgeUserType'
// Visit https://material-ui.com/components/avatars/ to learn more

const Avatar = props => {
    const {alt, src, variant, children, autoWidth, userType} = props
    const classes = useStyles(props)

    return (
        <>
        {userType ? 
            (
                <BadgeUserType userType={userType}>
                    <MuiAvatar
                        alt={alt}
                        src={src}
                        variant={variant}
                        className={classes.root}
                    >
                    {children}
                    </MuiAvatar>
                </BadgeUserType>
            )
            : (
                <MuiAvatar
                alt={alt}
                src={src}
                variant={variant}
                className={classes.root}
                >
                {children}
                </MuiAvatar>
            )
        }

        </>
    )
}

Avatar.proptypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    variant: PropTypes.string,
    autoWidth: PropTypes.bool,
    marginBottom: PropTypes.string,
}

export default Avatar