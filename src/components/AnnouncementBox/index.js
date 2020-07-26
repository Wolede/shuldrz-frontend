import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, useMediaQuery } from '@material-ui/core'
import Paper from 'components/Paper'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import ReactMarkdown from "react-markdown"

const AnnouncementBox = ( { announcement } ) => {
    const classes = useStyles()

    const theme = useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.up('sm'));

    // console.log('announcement', announcement);
    const { message, title } = announcement

    return (
        <Paper borderRadius="1.875rem 0.625rem 1.875rem 1.875rem" padding="1rem" marginBottom="1.5rem" color="primary">
            <Box display="flex" className={classes.root}>
                <Box>
                    <Paper 
                        width={isMobile ? '8rem' : '3.125rem'} 
                        borderRadius={isMobile ? null : '1.25rem'} 
                        height={isMobile ? '6.25rem' : '3.125rem'} 
                        padding=".5rem"
                    >
                        <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                            logo
                        </Box>
                    </Paper>
                </Box>
                <Box flexGrow="1" paddingLeft={isMobile ? '2rem' : '1rem'}>

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
                </Box>
            </Box>
        </Paper>
    )
}

AnnouncementBox.propTypes = {
    announcement: PropTypes.object
}

export default AnnouncementBox
