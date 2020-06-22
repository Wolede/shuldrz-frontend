import React from 'react'
import {useStyles} from './styles'
import { Typography } from '@material-ui/core'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'

const CharityBox = () => {
    const classes = useStyles()
    return (
        <Paper width='186px' padding='16px'>
            <img src="/images/charity-1.png"/>
            {/* <Avatar width='10%' alt="charity" src="/images/charity-1.png" size="small"/> */}
            <Typography className={classes.fontSpacing} variant="body1">Selected Charity</Typography>
        </Paper>
    )
}

export default CharityBox
