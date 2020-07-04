import React from 'react'
import {useStyles} from './styles'
import Router from 'next/router'



const backButton = () => {
    const classes = useStyles()
    return (
        <div className={classes.paper} onClick={() => Router.back()}>
            <img src="/icons/arrowBack.svg"/>
        </div>
    )
}

export default backButton;