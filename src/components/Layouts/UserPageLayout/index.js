import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style';

const UserPageLayout = ({username}) => {
    const classes = useStyles()
    
    return (
        <div>
            { username }
        </div>
    )
}

UserPageLayout.propTypes = {
    username: PropTypes.string
}

export default UserPageLayout
