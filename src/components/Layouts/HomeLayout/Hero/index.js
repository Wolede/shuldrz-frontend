import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import Link from 'next/link';


const Hero = (props) => {
    const { heroTitle, heroImage } = props
    const classes = useStyles(props)
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));

    return (
        <Container maxWidth={isDesktop ? 'xl' : 'lg'}>
            <Box id='hero' position='relative' paddingBottom={isDesktop ? '10rem' : '12rem'}>
                <Box id='hero-back' paddingTop={isDesktop ? '11.25rem' : '9.25rem'} display="flex" justifyContent='center' alignItems='center' className={classes.circleBox}>
                    <div className={classes.circleWrapper}>
                        <div id='circle' className={classes.circle}>

                        </div>
                    </div>
                </Box>
                <div className={classes.textWrap}>
                    {/* <Grid container> */}
                        {/* <Grid xs={12} sm={12} md={7} item> */}
                            <Box id='hero-front' paddingTop={isDesktop ? '18rem' : '16rem'}>
                                <Typography variant='h1' gutterBottom className={classes.heroJumbo}>
                                    {heroTitle}
                                </Typography>
                                <Typography variant='subtitle1'>
                                    <Link href='/signup'><a className={classes.link}>Join Shuldrz</a></Link> where compassion lends a shuldr
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
