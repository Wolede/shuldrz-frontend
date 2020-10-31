import PropTypes from 'prop-types'
import { useStyles } from './style'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import Button from 'components/Button'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Link from 'next/link'
// import useAuth from 'contexts/Auth'

const ProfileBox = ({userData, otherUser}) => {
    // const { user } = useAuth()
    const classes = useStyles()

    
    
    return (
        <Paper padding="2rem 2rem 1.5rem 2rem" marginBottom="1.5rem">
            <Box display="flex" flexDirection="column" alignItems='center' justifyContent="center">
                {!userData ? (
                    <Skeleton variant="rect" width={150} height={150} animation="wave"/>
                ) : (
                    <>
                    <Link href="/app/profile">
                        <a style={{textDecoration:'none'}}>
                        <Avatar 
                            alt={userData.username} 
                            src={userData.profileImage ? userData.profileImage.url : null} 
                            size="medium" 
                            marginBottom="1.5rem" 
                            userType={userData.userType}
                        >{!userData.profileImage ? userData.username.substring(0,1) : null}</Avatar>
                        </a>
                    </Link>

                    <Typography variant="h4" className={classes.text} style={{ textAlign: 'center' }}>{userData.firstName} {userData.lastName}</Typography>

                    <Typography variant={otherUser ? "body2" : "body1"} className={classes.text}>{userData.occupation ? userData.occupation : 'Occupation not set'}</Typography>

                    {otherUser && (
                        <Typography variant="body1" className={classes.text}>{userData.experience ? userData.experience : '- - -'}</Typography>
                    )}
                    <Box display="flex" justifyContent="center" flexWrap="wrap">
                        { userData.userType === 'Volunteer'  && (
                            <Chip label={userData.ranking ? userData.ranking.name : 'Bronze'} rank={userData.ranking ? userData.ranking.colourCode : '#cd7f32'} color="paper"/>
                        )}
                        <Chip label={userData.heart ? userData.heart.count.toString() : 'No hearts yet'} heart color="paper"/>
                    </Box>
                    
                    {/* // don't show edit profile if we're showing another user */}
                    {!otherUser && (
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
