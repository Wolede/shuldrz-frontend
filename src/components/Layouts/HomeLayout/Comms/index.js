import React from 'react'
import PropTypes from 'prop-types'
import { Container, Box, useMediaQuery, Typography, Grid } from '@material-ui/core'
import Paper from 'components/Paper'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import ReactMarkdown from 'react-markdown';

const Comms = props => {
    const { featuresContent, featuresTitle } = props
    const classes = useStyles(props)
    const theme = useTheme();
    const isDesktop= useMediaQuery(theme.breakpoints.up('xl'));
    return (
        <Container maxWidth={ isDesktop ? 'xl' : 'lg' }>
            <Box id='comms' paddingBottom='10rem'>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box paddingRight={ isDesktop ? '5rem' : 0 }>
                        <Typography variant='h2' className={classes.subHeader} gutterBottom>
                            {featuresTitle}
                        </Typography>
                        <Typography variant='subtitle2' className={classes.commsContent}>
                            <ReactMarkdown source={featuresContent}/>
                        </Typography>

                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={6}>
                                <Paper color='secondary' height="12rem" padding='3rem' borderRadius='3.75rem'>
                                    <Box display='flex' height='100%' alignItems='flex-end' justifyContent='center'>
                                        <Typography variant='subtitle1'> Get Matched </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper color='warning' height="12rem" padding='3rem' borderRadius='3.75rem'>
                                    <Box display='flex' height='100%' alignItems='flex-end' justifyContent='center'>
                                        <Typography variant='subtitle1'> Messaging </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper color='primary' height="12rem" padding='3rem' borderRadius='3.75rem'>
                                    <Box display='flex' height='100%' flexDirection='column' alignItems='center' justifyContent='flex-end'>
                                        <Typography variant='subtitle1'> Audio </Typography>
                                        <Typography variant='caption' color='secondary'> coming soon </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper color='error' height="12rem" padding='3rem' borderRadius='3.75rem'>
                                    <Box display='flex' height='100%' flexDirection='column' alignItems='center' justifyContent='flex-end'>
                                    <Typography variant='subtitle1'> Video </Typography>
                                        <Typography variant='caption' color='secondary'> coming soon </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>

                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box display='flex' justifyContent='flex-end' height='100%'>
                            <div className={classes.imageWrapper}>
                                <div className={classes.image}>

                                </div>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

Comms.propTypes = {

}

export default Comms
