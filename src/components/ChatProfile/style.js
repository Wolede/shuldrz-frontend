import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0',
        zIndex: '10',
    },
    icon: {
        marginLeft: '40px',
        cursor: 'pointer'
    }    

}))

export { useStyles }