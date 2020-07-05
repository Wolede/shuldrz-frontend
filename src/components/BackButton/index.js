import React from 'react'
import {useStyles} from './styles'
import Router from 'next/router'



const BackButton = () => {
    const classes = useStyles()
    return (
        <div className={classes.paper} onClick={() => Router.back()}>
            <img src="/icons/arrowBack.svg"/>
        </div>
    )
}

export default BackButton;