import PropTypes from 'prop-types'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import Button from 'components/Button'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const ProfileBox = () => {
    const { user } = useAuth()
    const classes = useStyles()

    return (
        <Paper padding="2rem 2rem 1.5rem 2rem" marginBottom="2rem">
            <Box display="flex" flexDirection="column" alignItems='center' justifyContent="center">
                {!user ? (
                    <Skeleton variant="rect" width={150} height={150} animation="wave"/>
                ) : (
                    <>
                    <Avatar 
                        alt={user.firstName} 
                        src={user.profileImage ? user.profileImage.url : '/empty'} 
                        size="medium" 
                        marginBottom="1.5rem" 
                    />

                    <Typography variant="h4" className={classes.text}>{user.firstName} {user.lastName}</Typography>

                    <Typography variant="body1" className={classes.text}>{user.occupation ? user.occupation : 'Occupation not set'}</Typography>

                    <Chip label={user.hearts ? user.hearts : 'No hearts yet'} heart color="paper"/>
                    
                    <Button variant="contained" size="small" color="secondary" marginTop='1rem'>Edit Profile</Button>
                    </>
                )}
                
                
            </Box>
        </Paper>
    )
}

export default ProfileBox
