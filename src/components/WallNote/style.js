import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: props => props.color,
        color: theme.palette.primary.contrastText,
        padding: '1.5rem',
        borderRadius: '1.875rem',
        width: '100%',
        height: '100%',
        '& a':{
            color: theme.palette.primary.contrastText,
        }
    },
    buttonBase:{
        width: '100%',
        textAlign: 'left',
    },
    link: {
        cursor: 'pointer'
    }
    
}));

export { useStyles };