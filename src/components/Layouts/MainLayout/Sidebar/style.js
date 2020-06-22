import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width : '28rem'
        },
        [theme.breakpoints.up('md')]: {
            width : '26rem'
        },
        border: 'none',
    },
    root: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: theme.spacing(4),
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    button: {
        padding: '10px 8px',
        justifyContent: 'flex-start',
        // textTransform: 'none',
        // letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
    }
}))

export { useStyles }