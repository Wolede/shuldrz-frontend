import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, useMediaQuery } from '@material-ui/core'
import Paper from 'components/Paper'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'

const AnnouncementBox = props => {
    const classes = useStyles()

    const theme = useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Paper borderRadius="1.875rem 0.625rem 1.875rem 1.875rem" padding="1rem" marginBottom="3rem" color="primary">
            <Box display="flex">
                <Box>
                    
                </Box>
                <Box flexGrow="1" paddingLeft={isMobile ? '2rem' : '1rem'}>

                    <Box marginBottom=".5rem">
                        <Typography variant="h3" gutterBottom>
                            Welcome to Shuldrz
                        </Typography>
                    </Box>

                    <Typography variant="subtitle1">
                        blah blah
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

AnnouncementBox.propTypes = {

}

export default AnnouncementBox
