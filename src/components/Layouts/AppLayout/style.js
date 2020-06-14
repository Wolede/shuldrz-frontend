import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4),
        [theme.breakpoints.up('lg')]: {
            margin: '0 auto auto 17rem',
        }
    }
}))

export { useStyles }