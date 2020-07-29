import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import Paper from '../PersonalityBox/node_modules/components/Paper'
import Chip from 'components/Chip'
import { Box, Typography} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'


const AvailabilityBox = ({userData}) => {
    const classes = useStyles()

    return (
        <Paper padding="2rem 1.1rem 2rem 1.5rem" marginBottom="1.5rem">
            <Box className={classes.root}>
                <Typography variant="h4" className={classes.text}>Availability</Typography>
                {!userData ? (
                    <Skeleton variant="rect" height={150} animation="wave"/>
                ) : 
                    userData.length === 0 ? (
                        <Typography align="center" variant="body1">No availability</Typography>
                    ) :
                    // user data list goes here
                    (
                        <>
                        <Typography variant='body1' gutterBottom>Days of the week</Typography>
                        <Box className={classes.chipBox}>

                        {userData.availableDays?.map((day, key) => (
                                    <Chip label={day} key={key} color="paper" />
                        ))}

                        </Box>

                        <Typography variant='body1' gutterBottom>Time</Typography>
                        <Box className={classes.chipBox}>
                            <Chip label={userData.availableTime} color="paper" />
                        </Box>
                        </>
                    )

                    }
            </Box>
        </Paper>
    )
}

AvailabilityBox.propTypes = {

}

export default AvailabilityBox
