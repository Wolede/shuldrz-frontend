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
        // backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(4),
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    closeIcon: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
}))

export { useStyles }