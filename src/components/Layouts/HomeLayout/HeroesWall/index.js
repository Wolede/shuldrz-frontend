import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'

const HeroesWall = props => {
    const {heroesWallContent} = props
    const classes = useStyles()
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));

    return (
        <Container maxWidth={isDesktop ? 'xl' : 'lg'}>
            <Box id='heroes-wall' paddingBottom='10rem'>
                <Box marginBottom='2.5rem' textAlign='center' margin='0 auto' maxWidth={isDesktop ? '43.75rem' : '50rem'}>
                    <Typography variant='h2' className={classes.subHeader} gutterBottom>
                        Heroes Wall.
                    </Typography>
                    <Typography variant="subtitle2">
                        {heroesWallContent}
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper padding="1.25rem 1.25rem 2.5rem 1.25rem" borderRadius='3.75rem'>
                            <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
                            <Avatar
                                // alt={username}
                                // src={profileImage ? profileImage.url : '/empty'}
                                size="large"
                                autoWidth
                                marginBottom="1.5rem"
                            />
                            <Typography variant='h4' className={classes.headerText}>
                                John Willis
                            </Typography>
                            <Typography variant="body1" className={classes.text}>
                                {/* {experience ? experience : '- - -'} */}
                                Occupation
                            </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper padding="1.25rem 1.25rem 2.5rem 1.25rem" borderRadius='3.75rem'>
                            <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
                            <Avatar
                                // alt={username}
                                // src={profileImage ? profileImage.url : '/empty'}
                                size="large"
                                autoWidth
                                marginBottom="1.5rem"
                            />
                            <Typography variant='h4' className={classes.headerText}>
                                John Willis
                            </Typography>
                            <Typography variant="body1" className={classes.text}>
                                {/* {experience ? experience : '- - -'} */}
                                Occupation
                            </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper padding="1.25rem 1.25rem 2.5rem 1.25rem" borderRadius='3.75rem'>
                            <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
                            <Avatar
                                // alt={username}
                                // src={profileImage ? profileImage.url : '/empty'}
                                size="large"
                                autoWidth
                                marginBottom="1.5rem"
                            />
                            <Typography variant='h4' className={classes.headerText}>
                                John Willis
                            </Typography>
                            <Typography variant="body1" className={classes.text}>
                                {/* {experience ? experience : '- - -'} */}
                                Occupation
                            </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper padding="1.25rem 1.25rem 2.5rem 1.25rem" borderRadius='3.75rem'>
                            <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
                            <Avatar
                                // alt={username}
                                // src={profileImage ? profileImage.url : '/empty'}
                                size="large"
                                autoWidth
                                marginBottom="1.5rem"
                            />
                            <Typography variant='h4' className={classes.headerText}>
                                John Willis
                            </Typography>
                            <Typography variant="body1" className={classes.text}>
                                {/* {experience ? experience : '- - -'} */}
                                Occupation
                            </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <Box>
                    
                </Box>
            </Box>
        </Container>
    )
}

HeroesWall.propTypes = {

}

export default HeroesWall
