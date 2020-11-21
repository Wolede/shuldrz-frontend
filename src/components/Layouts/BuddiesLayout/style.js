import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    headerText: {
        flexGrow: 1
    },
    loader: {
        animation: `$spin 1s ${theme.transitions.easing.sharp} infinite`,
    },
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0)',
        },
        '100%': {  
            transform: 'rotate(359deg)'
        },
    },
}))

export { useStyles }