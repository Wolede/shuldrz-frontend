import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: theme.spacing(8, 4),
        [theme.breakpoints.up('lg')]: {
            margin: '0 auto auto 18rem',
            padding: theme.spacing(4),
            // zIndex: 9999,
        },
        height: '100vh'
    }
}))

export { useStyles }