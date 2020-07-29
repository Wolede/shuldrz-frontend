import { useStyles } from './style'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import { Box, Typography, Card, CardContent, Button as MuiButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR from 'swr'
import api from 'services/Api'
import moment from 'moment'

const UpcomingBox = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();

    const { data, error, isValidating } = useSWR(loading ? false : `/upcoming-sessions?user.id=${user?.id}&_limit=4`, api.get, {revalidateOnFocus: false})
    
    const upcomings = data ? data.data : null

    return (
        <Paper padding="2rem 1.1rem 2rem 1.5rem" marginBottom="1.5rem">
            <Box className={classes.root}>
                <Typography variant="h4" className={classes.text}>Upcoming Sessions</Typography>
                {!upcomings ? (
                    <Skeleton variant="rect" height={150} animation="wave"/>
                ) : 
                    upcomings.length === 0 || error ? (
                        <Typography align="center" variant="body1">No upcoming sessions yet</Typography>
                    ) :
                    // upcoming sessions list goes here
                    upcomings.map((upcoming, key) => (
                        <Box key={key} position="relative">
                            <Card className={classes.card}>
                                <Avatar 
                                    alt={upcoming.sessionUser.firstName} 
                                    src={upcoming.sessionUser.profileImage ? upcoming.sessionUser.profileImage.url : '/'} 
                                    size="small" 
                                />
                                <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography variant="h5" className={classes.text}>
                                            {upcoming.sessionUser.username}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary" className={classes.caption}>
                                            by {moment(upcoming.datetime).calendar()}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </Card>
                            <MuiButton size="small" variant="contained" color="primary" className={classes.offsetButton}>
                                View
                            </MuiButton>
                        </Box>
                    ))
                }
            </Box>
        </Paper>
    )
}

export default UpcomingBox
