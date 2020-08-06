import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'

const About = props => {
    const classes = useStyles()
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));

    return (
        <Container maxWidth={ isDesktop ? 'xl' : 'lg' }>
            <Box id='about' paddingBottom='10rem'>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} className={classes.gridOne}>
                        <Box paddingRight={ isDesktop ? '5rem' : 0 }>
                        <Typography variant='h2' className={classes.subHeader} gutterBottom>
                            A Listening Ear for Care Givers.
                        </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className={classes.gridTwo}>
                        <Box>
                        <Typography variant='subtitle2'>
                            Shuldrz is a Non-Profit product that lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            
        </Container>
    )
}

About.propTypes = {

}

export default About
