import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, Typography, useMediaQuery} from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'

const TandC = props => {
    const classes = useStyles()
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));


    return (
        <Container maxWidth={isDesktop ? 'xl' : 'lg'}>
            <Box id='terms' paddingBottom='10rem'>
                <Box marginBottom='2.5rem' textAlign='center' margin='0 auto'>
                    <Typography variant='h2' className={classes.subHeader} gutterBottom>
                        Terms and Conditions.
                    </Typography>
                    <Container maxWidth='md'>
                        <Typography variant="body1">
                            Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </Container>
    )
}

TandC.propTypes = {

}

export default TandC
