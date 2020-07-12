import React from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import ProfileCard from 'components/ProfileCard'


const BuddiesLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();

    const { data, error } = useSWR(loading ? false : `/users?userType=Volunteer&_sort=createdAt:desc&_limit=5`, api.get, {revalidateOnFocus: true})

    const buddies = data ? data.data : null



    return (
        <div>
            <Box marginBottom="2rem">
                <Typography variant="h3"> Buddies </Typography>
            </Box>
            {!buddies ? (
                <Skeleton variant="rect" height={150} animation="wave"/>
            ) : buddies.length === 0 || error ? (
                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">No Buddies for now</Typography>
                </Box>
            ) : // Buddies list goes here
                (
                <Grid container spacing={4}>
                {
                buddies.map(( buddy, key ) => { 
                    const { username, profileImage, occupation, heart, ranking, id } = buddy

                    return (
                        <Grid item xl={4} md={4} sm={6} xs={12} key={key}>
                            <ProfileCard 
                                username={username}
                                profileImage={profileImage}
                                occupation={occupation}
                                heart={heart}
                                id={id}
                                ranking={ranking}
                            />
                        </Grid>
                    )
                })}
                </Grid>
                )
                
            }
        </div>
    )
}

export default BuddiesLayout
