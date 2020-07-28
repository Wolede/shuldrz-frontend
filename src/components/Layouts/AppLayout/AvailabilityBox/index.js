import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import { Box, Typography, Card, CardContent, Button as MuiButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR from 'swr'
import api from 'services/Api'

const AvailabilityBox = props => {
    const classes = useStyles()
    const { user, loading } = useAuth();

    const { data, error, isValidating } = useSWR(loading ? false : `/users/${user?.id}`, api.get, {revalidateOnFocus: false})
    
    const userData = data ? data.data : null

    return (
        <Paper padding="2rem 1.1rem 2rem 1.5rem">
            <Box className={classes.root}>
                <Typography variant="h4" className={classes.text}>Availability</Typography>
                {!userData ? (
                    <Skeleton variant="rect" height={150} animation="wave"/>
                ) : 
                    userData.length === 0 || error ? (
                        <Typography align="center" variant="body1">No availability</Typography>
                    ) :
                    // user data list goes here
                    userData.availableDays.map((user, key) => (
                        <>

                        </>
                        ))
                    }
            </Box>
        </Paper>
    )
}

AvailabilityBox.propTypes = {

}

export default AvailabilityBox
