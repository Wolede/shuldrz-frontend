import { Card, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './styles';

const card = () => {
    const classes = useStyles()
    

    return (
        <Card className={classes.card}>
            <img src='/images/happy-woman.png' />
            <Typography variant="h5">Sarah Michaels</Typography>
            <Typography variant="body1">Product Designer</Typography>
            <div>
                <Button variant="contained" color="primary" size="small">MESSAGE</Button>
                <Button variant="contained" color="primary" size="small">View Profile</Button>
            </div>
        </Card>
    )
}


export default card;