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
    },

    img: {
        height: `100%`,
        width: `100%`,
        borderRadius: '5px'
    },
    
    icon: {
        '&:hover':{
            cursor: `pointer`,
            color: theme.palette.error.main
        }
    }
}));

export { useStyles }