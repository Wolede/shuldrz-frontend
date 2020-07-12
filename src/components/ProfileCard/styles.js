import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {       
        width: `22%`,
        boxShadow: `0px 60px 80px rgba(17,122,243,0.20)`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`
    },
    buttonGroup: {
        '& > button' : {
            margin: '1.5rem .5rem 0 0'
        }
    },
    headerText: {
        marginBottom: '.5rem'
    },
    text: {
        marginBottom: '.5rem'
    }
    
}));

export { useStyles };