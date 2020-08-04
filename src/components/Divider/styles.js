import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    container:{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3.5rem'
    },
      
    border:{
        borderBottom: '2px solid #838A97',
        width: '65%',
    },
      
    content:{
        width: '35%',
        padding: '0 10px 0 10px',
        textAlign: 'center',
        fontWeight: '100',
        fontSize: '1rem'
    }
}));

export { useStyles }