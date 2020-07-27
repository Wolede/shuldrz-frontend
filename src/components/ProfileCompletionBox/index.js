import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, useMediaQuery } from '@material-ui/core'
import Paper from 'components/Paper'
import Button from 'components/Button'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import ReactMarkdown from "react-markdown"
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';

const ProfileCompletionBox = ({ announcement, onCancel, destination }) => {
    const classes = useStyles()

    const theme = useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.up('sm'));

    // console.log('announcement', announcement);
    const { message, title, logo } = announcement

    return (
        <Paper borderRadius="1.875rem" padding="1rem" marginBottom="3.0rem" color="warning">
            <Box display="flex" className={classes.root}>
                <Box>
                    <Paper 
                        width={isMobile ? '8rem' : '3.125rem'} 
                        borderRadius={isMobile ? null : '1.25rem'} 
                        height={isMobile ? '6.25rem' : '3.125rem'} 
                        padding=".5rem"
                        color='transWarning'
                    >
                        <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                            <Typography variant="h4">{ logo }</Typography>
                        </Box>
                    </Paper>
                </Box>
                <Box flexGrow="1" paddingLeft={isMobile ? '2rem' : '1rem'}>

                    <div className={classes.iconButtons}>
                        <CloseIcon 
                            style={{ color: '#ffffff', fontSize: '1.4rem', cursor: 'pointer' }}
                            onClick={onCancel}
                        />
                    </div>

                    <Box marginBottom=".5rem">
                        <Typography variant="h3">
                            { title }
                        </Typography>
                    </Box>

                    <Typography 
                        variant="subtitle1" 
                        // dangerouslySetInnerHTML={{ __html : message }} 
                        style={{ fontSize: '1.2rem', fontWeight: 400 }} 
                    >
                        <ReactMarkdown source={message} />
                    </Typography>

                    <div className={classes.actionButtons}>
                        <Link href={destination}>
                            <a style={{textDecoration:'none'}}>
                                <Button variant="contained" size="small" color="secondary" marginTop='1rem'>Edit Profile</Button>
                            </a>
                        </Link>
                    </div>
                </Box>
            </Box>
        </Paper>
    )
}

ProfileCompletionBox.propTypes = {
    announcement: PropTypes.object
}

export default ProfileCompletionBox;
