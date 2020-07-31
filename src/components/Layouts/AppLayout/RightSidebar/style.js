import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width : '22rem'
        },
        [theme.breakpoints.up('xl')]: {
            width : '26rem'
        },
        border: 'none',
        background: 'none',
    },
    root: {
        [theme.breakpoints.down('md')]: {
            backgroundColor: theme.palette.background.default,
        },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(4),
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    closeIcon: {
        position: 'fixed',
        backgroundColor: theme.palette.error.main,
        bottom: theme.spacing(6),
        right: theme.spacing(6),
    }
}))

export { useStyles }