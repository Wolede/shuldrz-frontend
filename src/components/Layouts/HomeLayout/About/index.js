import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import ReactMarkdown from 'react-markdown';

const About = props => {
    const { aboutTitle, aboutContent } = props
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
                            {aboutTitle}
                        </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className={classes.gridTwo}>
                        <Box>
                        <Typography variant='subtitle2'>
                            <ReactMarkdown source={aboutContent} />
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
