import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
    },
    toolBar: {
        padding: theme.spacing(2, 0),
    },
    title: {
        flexGrow: 1
    },
    logo: {
        height: '6rem'
    },
    menuItem: {
        margin: theme.spacing(0,1)
    },
    menuLink: {
        textDecoration: 'none',
        margin: theme.spacing(0,1),
        color: theme.palette.secondary.main,
        '&:hover': {
            color: theme.palette.primary.main
        },
    },
    menuButton: {
        textDecoration: 'none',
        margin: theme.spacing(0,0,0,1)
    },
    lightText: {
        color: theme.palette.background.default,
        '&:hover': {
            color: theme.palette.primary.main,
        }
    },
    scroll: {
        position: 'fixed',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },

}))

export { useStyles }