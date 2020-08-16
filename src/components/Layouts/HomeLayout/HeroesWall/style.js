import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    subHeader: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '3.8rem',
            textAlign: 'center' 
        },
    },
    headerText: {
        marginBottom: '.5rem'
    },
    text: {
        marginBottom: '.5rem',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}))

export { useStyles }