import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, useMediaQuery } from '@material-ui/core'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import Link from 'next/link'

const SessionLogBox = ( { sessionLog } ) => {
    const classes = useStyles()

    const theme = useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.up('sm'));

    // console.log('sessionLog', sessionLog);
    const { sessionUser } = sessionLog

    return (
        <Paper borderRadius="1.875rem 0.625rem 1.875rem 1.875rem" padding="1rem" marginBottom="1.5rem" color="secondary">
            <Box display="flex">
                <Box width={isMobile ? '8rem' : '3.125rem'} height="100%">
                <Link href={`/app/users/${sessionUser.username}`}>
                    <a style={{textDecoration:'none'}}>
                        <Avatar 
                            alt={sessionUser.username} 
                            src={sessionUser.profileImage ? sessionUser.profileImage.url : null} 
                            size={isMobile ? 'small' : 'tiny'} 
                        >{!sessionUser.profileImage ? sessionUser.username.substring(0,1) : null}</Avatar>
                    </a>
                </Link>
                </Box>
                <Box flexGrow="1" paddingLeft={isMobile ? '2rem' : '1rem'}>

                    <Typography 
                        variant="subtitle1" 
                        style={{ fontWeight: 400 }}    
                    >
                        You had a session with:
                    </Typography>

                    <Box>
                        <Typography variant="h3">
                            { sessionUser.username }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

SessionLogBox.propTypes = {
    sessionLog: PropTypes.object
}

export default SessionLogBox
