import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        wordBreak: 'break-word'
    },
    iconButtons: {
        position: 'absolute',
        top: '-1rem',
        right:  '-1rem',
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        margin: theme.spacing(1),
    }
}))

export { useStyles }