import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import Badge from '@material-ui/core/Badge';

const BadgeUserType = props => {
    const { userType, children } = props
    const classes = useStyles(props)

    return (
        <Badge
            overlap="circle"
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            badgeContent={<span className={classes.badgeContent}>
                { userType === "Volunteer" ?
                    "buddy" :
                    "bud"
                }
            </span>}
        >
        {children}    
        </Badge>
    )
}

BadgeUserType.propTypes = {
    userType: PropTypes.string
}

export default BadgeUserType
