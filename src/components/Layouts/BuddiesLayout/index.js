import { Box, Grid, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import ProfileCard from 'components/ProfileCard'
import useAuth from 'contexts/Auth'
import React from 'react'
import api from 'services/Api'
import useSWR from 'swr'
import { useStyles } from './style'


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
                    const { username, profileImage, occupation, experience, heart, ranking, id, email } = buddy

                    return (
                        <Grid item xl={4} md={4} sm={6} xs={12} key={key}>
                            <ProfileCard 
                                username={username}
                                profileImage={profileImage}
                                occupation={occupation}
                                experience={experience}
                                heart={heart}
                                id={id}
                                ranking={ranking}
                                email={email}
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
