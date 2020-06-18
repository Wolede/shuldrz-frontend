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
    }
}))

export { useStyles }