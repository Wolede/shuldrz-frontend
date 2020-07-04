import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({    
    
    root: {
        backgroundColor: 'red',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        // display: 'inline-block',
        margin: '0',
        padding: '0',
        position:  props =>  props.position,
        top: props => props.top ? props.top : null,
        left: props => props.left ? props.left : null,
        right: props => props.right ? props.right : null,
        bottom: props => props.bottom ? props.bottom : null,
        zIndex: props => props.zIndex ? props.zIndex : null,
        whiteSpace: 'pre'
        // '&:before':{
        //     content: "",
        //     display: 'inline'
        // }
    },

    // typography:{
    //     width:'100%'
    // }
    
}))

export { useStyles }