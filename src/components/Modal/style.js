import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        overflowX: 'scroll',
    },
    embedContainer: {
        position: 'relative',
        paddingBottom: '56.25%',
        height: '0',
        overflow: 'hidden',
        maxWidth: '100%', 
    },
}))

export { useStyles }