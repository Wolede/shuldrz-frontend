import PropTypes from 'prop-types'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import Button from 'components/Button'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import Link from 'next/link'

const ProfileBox = (props) => {
    const { user, loading } = useAuth()
    const classes = useStyles()

    // other user means we're on a user profile page
    const requestUrl = props.otherUser ? `/users?username=${props.otherUser}` : `/users/${user?.id}`

    const { data, error, isValidating } = useSWR(loading ? false : requestUrl, api.get, {revalidateOnFocus: false})
    
    // store the first array of data if it's another user
    const userData = data ? 
                        props.otherUser ?
                            data.data[0] :
                            data.data : 
                    null
    console.log(userData, 'user data in profile')
    
    return (
        <Paper padding="2rem 2rem 1.5rem 2rem" marginBottom="2rem">
            <Box display="flex" flexDirection="column" alignItems='center' justifyContent="center">
                {!userData ? (
                    <Skeleton variant="rect" width={150} height={150} animation="wave"/>
                ) : (
                    <>
                    <Avatar 
                        alt={userData.firstName} 
                        src={userData.profileImage ? userData.profileImage.url : '/empty'} 
                        size="medium" 
                        marginBottom="1.5rem" 
                    />

                    <Typography variant="h4" className={classes.text}>{userData.firstName} {userData.lastName}</Typography>

                    <Typography variant="body1" className={classes.text}>{userData.occupation ? userData.occupation : 'Occupation not set'}</Typography>

                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        { user.userType === 'Volunteer'  && (
                            <Chip label={userData.ranking ? userData.ranking.name : 'Bronze'} rank={userData.ranking ? userData.ranking.colourCode : '#cd7f32'} color="paper"/>
                        )}
                        <Chip label={userData.heart ? userData.heart.count.toString() : 'No hearts yet'} heart color="paper"/>
                    </Box>
                    
                    {/* // don't show edit profile if we're showing another user */}
                    {!props.otherUser && (
                        <Link href="/app/profile">
                        <a style={{textDecoration:'none'}}>
                            <Button variant="contained" size="small" color="secondary" marginTop='1rem'>Edit Profile</Button>
                        </a>
                        </Link>
                    )}
                    </>
                )}
                
                
            </Box>
        </Paper>
    )
}

export default ProfileBox
