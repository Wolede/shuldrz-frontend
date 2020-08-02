import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    subHeader: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '3.8rem'
        },
    },
    imageWrapper: {
        width: '100%',
        maxWidth: '36.5rem',
        height: '100%',
        padding: '1.2rem',
        borderRadius: '3.75rem',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0px 60px 80px rgba(133, 206, 158, 0.25)`,
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            height: '28rem',
        },
    },
    image: {
        backgroundImage : 'url(/images/scenic-view.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '3.75rem',
        height: '100%',
    },
}))

export { useStyles }