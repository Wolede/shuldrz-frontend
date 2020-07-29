import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Fab, Box, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import Button from 'components/Button'
import useAuth from 'contexts/Auth'
import Modal from 'components/Modal'


const ChatProfile = (props) => {
    const classes = useStyles(props)
    const { closeChatProfile, chatProfile } = props
    const { user, loading } = useAuth()

    const [openModal, setOpenModal] = React.useState(false);

    

    const handleClose = () => {
        setOpenModal(false);
    };

    const handleReviewClick = () => {
        setOpenModal(true);
    }

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
                <Avatar 
                        alt={chatProfile.firstName} 
                        src={chatProfile.profileImage ? chatProfile.profileImage.url : '/empty'} 
                        size="large"                         
                        // autoWidth
                        margin="1.5rem auto" 
                />

                <Typography variant="h4" className={classes.text}>{chatProfile.firstName} {chatProfile.lastName}</Typography>

                <Typography variant="body1" className={classes.text}>{chatProfile.occupation ? chatProfile.occupation : 'Occupation not set'}</Typography>

                <Box display="flex" justifyContent="center" flexWrap="wrap" marginTop="1.5rem">
                    <Chip label={chatProfile.ranking ? chatProfile.ranking.name : 'Bronze'} rank={chatProfile.ranking ? chatProfile.ranking.colourCode : '#cd7f32'} color="paper"/>

                    <Chip label={chatProfile.heart ? chatProfile.heart.count.toString() : 'No hearts yet'} heart color="paper"/>
                </Box>

                <Button variant="contained" size="small" color="primary" marginTop='1.5rem'  onClick={handleReviewClick}>Leave a review</Button>

            </Box>

            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal chatProfile={chatProfile} handleClose={handleClose} openModal={openModal} view='review' embedUrl={null} />
                )
            }
        </div>
    )
}

ChatProfile.propTypes = {
    closeChatProfile: PropTypes.func
}

export default ChatProfile
