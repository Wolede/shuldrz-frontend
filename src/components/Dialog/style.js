import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth : 600,
        outline : 0,
    },
    dialog: {
        '& .MuiDialog-paper' : {
            backgroundColor: 'inherit',
            boxShadow: 'none',
            borderRadius: '0'
        }
    }
}));

export { useStyles }