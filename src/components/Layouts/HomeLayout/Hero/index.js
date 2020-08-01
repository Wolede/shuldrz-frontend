import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import Link from 'next/link';


const Hero = () => {
    const classes = useStyles()
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));

    return (
        <Container maxWidth={isDesktop ? 'xl' : 'lg'}>
            <Box id='hero' position='relative'>
                <Box id='hero-back' paddingTop={isDesktop ? '11.25rem' : '9.25rem'} display="flex" justifyContent='center' alignItems='center'>
                    <div className={classes.circleWrapper}>
                        <div id='circle' className={classes.circle}>

                        </div>
                    </div>
                </Box>
                <div className={classes.textWrap}>
                    {/* <Grid container> */}
                        {/* <Grid xs={12} sm={12} md={7} item> */}
                            <Box compon id='hero-front' paddingTop={isDesktop ? '18rem' : '16rem'} paddingBottom='5rem'>
                                <Typography variant='h1' gutterBottom className={classes.heroJumbo}>
                                    Do you need someone to talk to?
                                </Typography>
                                <Typography variant='subtitle1'>
                                    <Link href='/signup'><a className={classes.link}>Join Shuldrz</a></Link> and get a shoulder to lean on
                                </Typography>
                            </Box>
                        {/* </Grid> */}
                    {/* </Grid> */}
                </div>
            </Box>
        </Container>
    )
}

Hero.propTypes = {

}

export default Hero
