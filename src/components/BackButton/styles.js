import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {       
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0px 15px 20px rgba(17,122,243,0.20)`,
        width: `42px`,
        height: `42px`,
        borderRadius: `50%`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        cursor: 'pointer',
    },
    closeButton: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0px 15px 20px rgba(17,122,243,0.20)`,
        padding: '.5rem',
        '&:hover' : {
            backgroundColor: `rgba(63, 49, 107, 0.20)`,
            boxShadow: `0px 15px 20px rgba(63, 49, 107, 0.35)`,
            transform: `translateY(-1.7px)`
        },
    },
    closeIcon: {
        stroke: theme.palette.secondary.main,
        strokeWidth: '2.2',        
    }
    
}));

export { useStyles };
