import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Fab, Box, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'

const ChatProfile = (props) => {
    const classes = useStyles(props)
    const { closeChatProfile } = props

    return (
        <div className={classes.root}>
            <Box 
                position='sticky'
                top='0.1px'
                display="flex"
                padding='0rem 2rem 1rem 2rem'
            >
                <Box flexGrow='1' display='flex' alignItems='center'>
                <Fab size="small" aria-label="back" color='secondary' onClick={closeChatProfile} style={{ marginRight: '1rem', backgroundColor: 'rgb(253, 70, 89)' }}>
                    <CloseIcon />
                </Fab>
                </Box>
            </Box>
            <Box margin="0 auto" maxWidth="300" textAlign='center'>
                {/* <Avatar 
                        alt={userData.firstName} 
                        src={userData.profileImage ? userData.profileImage.url : '/empty'} 
                        size="large" 
                        // autoWidth
                        marginBottom="1.5rem" 
                />

                <Typography variant="h4" className={classes.text}>{userData.firstName} {userData.lastName}</Typography>

                <Typography variant="body1" className={classes.text}>{userData.occupation ? userData.occupation : 'Occupation not set'}</Typography>

                <Box display="flex" justifyContent="center" flexWrap="wrap">
                    <Chip label={userData.ranking ? userData.ranking.name : 'Bronze'} rank={userData.ranking ? userData.ranking.colourCode : '#cd7f32'} color="paper"/>

                    <Chip label={userData.heart ? userData.heart.count.toString() : 'No hearts yet'} heart color="paper"/>
                </Box> */}

            </Box>
        </div>
    )
}

ChatProfile.propTypes = {
    closeChatProfile: PropTypes.func
}

export default ChatProfile
