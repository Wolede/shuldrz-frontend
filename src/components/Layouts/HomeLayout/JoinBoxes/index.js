import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import Button from 'components/Button'
import Paper from 'components/Paper'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import Link from 'next/link'

const JoinBoxes = props => {
    const classes = useStyles()
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));
    const { guestSignupText, volunteerSignupText } = props
    return (
        <Container maxWidth={ isDesktop ? 'xl' : 'lg' }>
            <Box id='about' paddingBottom='10rem'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={7}>
                        <Paper color="secondary" padding='4rem' borderRadius='3.75rem' height="100%">
                            <Box height='100%' textAlign='center' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <Typography variant='h4' gutterBottom>
                                    {guestSignupText}
                                </Typography>
                                <Link href='/signup'>
                                    <a style={{textDecoration: 'none'}}>
                                        <Button color="primary" variant="contained">Sign Up</Button>               
                                    </a>
                                </Link>

                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <Paper color="primary" padding='4rem 2rem' borderRadius='3.75rem' height="100%">
                            <Box height='100%' textAlign='center' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <Typography variant='h4' gutterBottom>
                                    {volunteerSignupText}
                                </Typography>
                                <Link href='/volunteer-signup'>
                                    <a style={{textDecoration: 'none'}}>
                                        <Button color="secondary" variant="contained">Get Started</Button>              
                                    </a>
                                </Link>

                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

JoinBoxes.propTypes = {

}

export default JoinBoxes
