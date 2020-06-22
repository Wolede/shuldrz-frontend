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
    grid: {
        flexWrap: 'nowrap'
    },
    h4: {
        marginBottom: '8px'
    },
    typography:{
        marginLeft: '16px'
    },

    root:{
        marginBottom: '16px'
        // color: props => props.color === 'null' ?  
    }
    
}))

export { useStyles }