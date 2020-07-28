import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        '& p':{
            margin: 0,
        }
    },
    iconButtons: {
        position: 'absolute',
        top: '-0.1rem',
        right:  '0rem',
        display: 'flex',
        alignItems: 'center',
    },
    actionButtons: {
        position: 'absolute',
        bottom: '-0.1rem',
        right:  '0rem',
        display: 'flex',
        alignItems: 'center',
    },
}))

export { useStyles }