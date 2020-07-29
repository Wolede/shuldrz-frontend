import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import Paper from 'components/Paper'
import { Box, Typography} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const PersonalityBox = ({userData, otherUser}) => {
    const classes = useStyles()

    const personalityType = userData?.personality_type

    return (
        <Paper padding="1rem 1rem 1rem 1rem">
            <Box textAlign='center'>
                {!userData ? (
                    <Skeleton variant="rect" height={80} animation="wave"/>
                ) : 
                    !personalityType ? (
                        <Typography align="center" variant="body1">Personality not set</Typography>
                    ) : 
                    // personality goes here
                    (
                        <>
                        <Typography variant="body1" style={{textAlign: 'center'}}>
                            {otherUser ? `${userData?.username} is` : 'You are'}
                        </Typography>
                        <Paper color="secondary" padding='2px' marginBottom='.5rem'>
                            <Typography variant='h4' style={{textAlign: 'center'}}>
                                {userData?.personality_type?.personalityType}
                            </Typography>
                        </Paper>
                        <a 
                            className={classes.link} 
                            href={userData?.personality_type?.link} 
                            target='_blank'
                        >
                            Learn More
                        </a>
                        </>
                    )

                }
            </Box>
        </Paper>
    )
}

export default PersonalityBox
