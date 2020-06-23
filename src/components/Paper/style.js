import { makeStyles } from '@material-ui/core/styles'

const colorPicker = (color, theme) => {
    switch (color) {
        case 'primary':
            return {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: `0px 30px 60px rgba(13, 206, 158, 0.1)`,
            }
        case 'secondary':
            return {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                boxShadow: `0px 30px 60px rgba(63, 49, 107, 0.15)`,
            }
        case 'warning':
            return {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                boxShadow: `0px 30px 60px rgba(243, 183, 0, 0.15)`,
            }
        case 'error':
            return {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                boxShadow: `0px 30px 60px rgba(237, 123, 132, 0.15)`,
            }
        default: 
            return {
            backgroundColor: theme.palette.background.paper,
            color: null,
            boxShadow: `0px 30px 60px rgba(13, 206, 158, 0.1)`,
        }
    }
}
const useStyles = makeStyles(theme => ({
    root: {
        width: props => props.width ? props.width : `100%`,
        padding: props => props.padding ? props.padding : `2.5rem`,
        borderRadius: props => props.borderRadius ? props.borderRadius : `1.875rem`,
        boxShadow: props => {const color = colorPicker(props.color, theme); return color.boxShadow},
        backgroundColor: props => {const color = colorPicker(props.color, theme); return color.backgroundColor},
        color: props => {const color = colorPicker(props.color, theme); return color.color},
        marginBottom: props => props.marginBottom,
    }
}));

export { useStyles }