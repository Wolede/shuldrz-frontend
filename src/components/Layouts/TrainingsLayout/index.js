import React from 'react'
import Paper from 'components/Paper'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import VideoBox from '../../VideoBox'

const TrainingsLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();

    const { data, error, isValidating } = useSWR(loading ? false : `/trainings`, api.get, {revalidateOnFocus: false})
    
    const trainings = data ? data.data : null
    console.log(trainings, 'trainings')

    return (
        <div>
            <Typography variant="h3" gutterBottom>Trainings</Typography>
            {!trainings ? (

                <Skeleton variant="rect" height={150} animation="wave"/>

            ) : trainings.length === 0 || error ? (

                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">No Trainings for now</Typography>
                </Box>

            ) :  //training list goes here
                trainings.map((training, key) => {
                    const { link, name, type, backgroundImage } = training
                    return (
         
                        <VideoBox key={key} link={link} title={name} type={type} backgroundImage={backgroundImage.url} />

                    )
                })
            }
            
        </div>
    )
}

export default TrainingsLayout
