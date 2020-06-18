import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {       
        boxShadow: `0px 15px 20px rgba(17,122,243,0.20)`,
        width: `42px`,
        height: `42px`,
        borderRadius: `50%`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`
    }
    
}));

export { useStyles };
