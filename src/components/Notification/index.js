import React from 'react'
import { useStyles } from './styles'

const Notification = (props) => {
    const classes = useStyles(props)
    return (
        <span className={classes.root}>     </span>
    )
}

export default Notification
