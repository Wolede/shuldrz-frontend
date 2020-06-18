import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    drawer: {
        width: 160,
        // [theme.breakpoints.up('lg')]: {
        //     marginTop: 64,
        //     height: 'calc(100% - 64px)'
        // }
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2),
        textAlign: 'center'
    }
}))

export { useStyles }