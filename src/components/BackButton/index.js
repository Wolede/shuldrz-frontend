import React from 'react'
import { Fab } from '@material-ui/core'
import {useStyles} from './styles'
import Router from 'next/router'
import { ArrowLeft } from 'react-feather';


const BackButton = () => {
    const classes = useStyles()
    return (
        <Fab 
            size="small" 
            aria-label="back" 
            onClick={() => Router.back()}
            className={classes.closeButton}
        >
            <ArrowLeft className={classes.closeIcon} />
        </Fab>
    )
}

export default BackButton;