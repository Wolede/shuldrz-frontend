import { makeStyles } from '@material-ui/core/styles'

const colorPicker = (color, theme) => {
    switch (color) {
        case 'primary':
            return {
                mainColor: theme.palette.primary.main,
                textColor: theme.palette.primary.contrastText,
            }
        case 'secondary':
            return {
                mainColor: theme.palette.secondary.main,
                textColor: theme.palette.secondary.contrastText,
            }
        case 'warning':
            return {
                mainColor: theme.palette.warning.main,
                textColor: theme.palette.warning.contrastText,
            }
        case 'error':
            return {
                mainColor: theme.palette.error.main,
                textColor: theme.palette.error.contrastText,
            }
        case 'paper':
            return {
                mainColor: theme.palette.background.default,
                textColor: theme.palette.text.primary,
            }
        default:
            return {
                mainColor: null,
            }
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: props =>  props.margin ? props.margin : theme.spacing(0.5),
        backgroundColor: props => {const color = colorPicker(props.color, theme); return color.mainColor},
        color: props => {const color = colorPicker(props.color, theme); return color.textColor},
        padding: '.5rem 0 .5rem .18rem',
        fontSize: '1rem',
    }
}))

export { useStyles }