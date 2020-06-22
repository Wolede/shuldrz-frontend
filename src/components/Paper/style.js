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
    root: {
        width: props => props.width ? props.width : `100%`,
        height: props => props.height ? props.height: null,
        padding: props => props.padding ? props.padding : `2.5rem`,
        borderRadius: props => props.borderRadius ? props.borderRadius : '1.875rem 1.875rem 1.875rem 1.875rem',  
        borderTopLeftRadius: props => props.borderTopLeftRadius ? props.borderTopLeftRadius : null,
        borderTopRightRadius: props => props.borderTopRightRadius ? props.borderTopRightRadius : null,
        borderBottomLeftRadius: props => props.borderBottomLeftRadius ? props.borderBottomLeftRadius : null,
        borderBottomRightRadius: props => props.borderBottomRightRadius ? props.borderBottomRightRadius : null,
        boxShadow: props => {const color = colorPicker(props.color, theme); return color.boxShadow},
        backgroundColor: props => {const color = colorPicker(props.color, theme); return color.backgroundColor},
        color: props => {const color = colorPicker(props.color, theme); return color.color},    
        // borderTopRightRadius: props => props.active ? '0' : null,
        // borderBottomRightRadius: props => props.active ? '0' : null,
        // backgroundColor: props => props.active ? theme.palette.secondary.main : null,
    },
    
    inactive: {
        borderRadius: '0'
    }
}));

export { useStyles }

