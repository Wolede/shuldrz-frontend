import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Paper from 'components/Paper'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import ProfileForm from '../../Forms/ProfileForm'
import UploadForm from '../../Forms/UploadForm'
import BackButton from 'components/BackButton'

const ProfileLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();
    
    const { data, error, isValidating } = useSWR(loading ? false : `/users/${user?.id}`, api.get, {revalidateOnFocus: false})
    
    const userData = data ? data.data : null
    // console.log(userData, 'user data in profile')

    return (
        <>
            <Box marginBottom="1.5rem">
                <BackButton />  
            </Box>
            <Paper>
                <Box marginBottom="2.5rem" textAlign='center'>
                    <Typography variant="h3" gutterBottom>Edit Profile</Typography>
                    <Typography variant="body2">
                        {userData?.userType === 'Volunteer' && (
                            'Fill in your information to help us match appropriate guests to you'
                        )}
                        {userData?.userType === 'Guest' && (
                            'Fill in your information to help us match appropriate volunteers to you'
                        )}
                    </Typography>
                </Box>     
                
                {!userData ? (
                    <Skeleton variant="rect" height={150} animation="wave"/>
                ) : (
                    <>
                    <UploadForm user={userData} />
                    <ProfileForm user={userData} />
                    </>
                )}
            </Paper>
        </>
    )
}

export default ProfileLayout
