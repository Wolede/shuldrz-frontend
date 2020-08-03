import React from 'react'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import Link from 'next/link';

const Footer = () => {
    const classes = useStyles()
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));
    const isMobile= useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container maxWidth={ isDesktop ? 'xl' : 'lg' }>
            <Box id='footer' paddingBottom='3rem' textAlign='center'>
                <Box id='social-links' display='flex' justifyContent='center' marginBottom='2rem' flexDirection={isMobile ? 'column' : 'row'}>
                    <Typography variant="h4">
                        <a href='#' className={classes.linkBig}>Facebook</a>
                    </Typography>
                    <Typography variant="h4">
                        <a href='#' className={classes.linkBig}>Instagram</a>
                    </Typography>
                    <Typography variant="h4">
                        <a href='#' className={classes.linkBig}>Twitter</a>
                    </Typography>
                    <Typography variant="h4">
                        <a href='#' className={classes.linkBig}>Medium</a>
                    </Typography>
                </Box>
                <Box id='doc-links' display='flex' justifyContent='center' marginBottom='2.5rem'>
                    {/* <Typography variant="body2">
                        <Link href='/privacy-policy'><a className={classes.link}>Privacy Policy</a></Link>
                    </Typography> */}
                    <Typography variant="body2">
                        <Link href='/terms-and-conditions'><a className={classes.link}>Terms & Conditions</a></Link>
                    </Typography>

                </Box>
                <Box>
                    <Typography variant='body1'>
                            ©{new Date().getFullYear()}, Shuldrz
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Footer
