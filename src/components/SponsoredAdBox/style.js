import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {

    },
    card: { 
        borderRadius: '10px',
        backgroundColor: theme.palette.background.default,
        boxShadow: 'none',
        marginBottom: '1rem'
    },
    media: {
        height: '50px'
    },
    content: {
        padding: '1rem'
    }
}))

export { useStyles }