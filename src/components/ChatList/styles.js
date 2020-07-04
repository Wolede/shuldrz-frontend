import { makeStyles } from '@material-ui/core/styles'

const colorPicker = (color, theme) => {
    switch (color) {
        case 'primary':
            return {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: `0px 30px 60px rgba(0, 199, 102, 0.20)`,
            }
        case 'secondary':
            return {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                boxShadow: `0px 30px 60px rgba(63, 49, 107, 0.20)`,
            }
        case 'warning':
            return {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                boxShadow: `0px 30px 60px rgba(243, 183, 0, 0.20)`,
            }
        case 'error':
            return {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                boxShadow: `0px 30px 60px rgba(237, 123, 132, 0.20)`,
            }
        default: 
            return {
            backgroundColor: theme.palette.background.paper,
            color: null,
            boxShadow: `0px 30px 60px rgba(0, 199, 102, 0.20)`,
        }
    }
}

const useStyles = makeStyles(theme => ({    
    chatItem: {
        display: 'flex',
        // flexDirection: 'row',
        padding: '1rem',
        flexWrap: 'nowrap',
        cursor: 'pointer'
    },
    h4: {
        marginBottom: '8px'
    },
    typography:{
        marginLeft: '16px',
        // width: '80%'
    },

    root:{
        marginBottom: '16px',
        // height: 'calc(100% - 35px)',
        // position: 'absolute',
        // color: props => props.color === 'null' ?  
    },

    chatActive:{
        display: 'flex',
        // flexDirection: 'row',
        padding: '1rem',
        flexWrap: 'nowrap',
        backgroundColor: '#3F316B',
        boxShadow: `0px 15px 20px rgba(63, 50, 107, 0.25)`,
        color: 'white',
        borderRadius: `1.8rem 0 0 1.8rem`
    }, 

    newChatBtn: {
        borderRadius: '0px'
    }
    
   
    // typography:{
    //     width:'100%'
    // }
    
}))

export { useStyles }