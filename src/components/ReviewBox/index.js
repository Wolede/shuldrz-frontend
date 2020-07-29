import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import { Typography, Box, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'

const ReviewBox = props => {
    const classes = useStyles()
    const { comment, hearts, userImage, username, otherUser } = props

    // console.log(comment, hearts, userImage, username);

    const theme = useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.up('sm'));
    
    return (
        <Paper borderRadius="1.875rem 0.625rem 1.875rem 1.875rem" padding="1rem" marginBottom="1.5rem" color="secondary">
                <Box display="flex">
                    <Box>
                        <Avatar 
                            alt={username} 
                            src={userImage ? userImage : '/'} 
                            size={isMobile ? 'small' : 'tiny'} 
                        />
                    </Box>
                    <Box flexGrow="1" paddingLeft={isMobile ? '2rem' : '1rem'}>
                        <Box>
                            {otherUser ? (
                                <Typography variant="subtitle1" gutterBottom>{username} left {otherUser} a review</Typography>
                            ) : (
                            <Typography variant="subtitle1" gutterBottom>{username} left you a review</Typography>
                            )}
                        </Box>
                        <Box marginBottom=".5rem">
                            <Chip label={hearts.toString()} heart/>
                        </Box>
                        <Box>
                            <Typography variant="body1">{comment}</Typography>
                        </Box>
                    </Box>
                </Box>
            
            <Box 
                className={classes.videoImage} 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                borderRadius="1.875rem"
            >
                

            </Box>
        </Paper>
    )
}

ReviewBox.propTypes = {
    comment: PropTypes.string,
    hearts: PropTypes.number,
    userImage: PropTypes.string,
    username: PropTypes.string,
    otherUser: PropTypes.string
}

export default ReviewBox