import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        boxShadow: 'none',
    },
    toolBar: {
        padding: theme.spacing(0, 4),
    },
    title: {
        flexGrow: 1
    },
    imageButton: {
        borderRadius: '1.25rem',
        boxShadow: '0px 15px 20px rgba(63, 49, 107, 0.25)'
    }
}))

export { useStyles }