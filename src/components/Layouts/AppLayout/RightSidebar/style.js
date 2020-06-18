import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    drawer: {
        width: '100%',
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
        height: '100%',
        padding: theme.spacing(4),
    },
    divider: {
        margin: theme.spacing(2, 0)
    }
}))

export { useStyles }