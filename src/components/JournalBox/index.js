import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, useMediaQuery } from '@material-ui/core'
import Paper from 'components/Paper'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import VisibilityIcon from '@material-ui/icons/Visibility';

const JournalBox = ( { journal } ) => {
    const classes = useStyles()

    const theme = useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.up('sm'));

    // console.log('journal', journal);
    const { notes } = journal

    return (
        <Paper borderRadius="1.875rem 0.625rem 1.875rem 1.875rem" padding="1rem" marginBottom="1.5rem" color="primary">
            <Box display="flex">
                <Box>
                    <Paper 
                        color="transPrimary" 
                        width={ isMobile ? '8rem' : '3.125rem' } 
                        borderRadius={isMobile ? null : '1.25rem'} 
                        height={isMobile ? '6.25rem' : '3.125rem'} 
                        padding=".5rem"
                    >

                        <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                            <FormatQuoteIcon style={{ fontSize: '3.5rem' }} />
                        </Box>
                        
                    </Paper>
                </Box>
                <Box flexGrow="1" paddingLeft={isMobile ? '2rem' : '1rem'}>

                    <Typography 
                        variant="subtitle1" 
                        dangerouslySetInnerHTML={{ __html : notes }} 
                        style={{ fontWeight: 400 }}    
                    />
                </Box>
            </Box>
        </Paper>
    )
}

JournalBox.propTypes = {
    journal: PropTypes.object
}

export default JournalBox
