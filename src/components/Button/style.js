import { makeStyles } from '@material-ui/core/styles'

// sizes 
const sizePicker = (size) => {
    switch (size) {
        case 'large':
            return {
                padding: '1.3rem 3.5rem',
                fontSize: '1.5rem'
            }
        case 'medium':
            return {
                padding: '0.8rem 2rem',
                fontSize: '1rem'
            }
        case 'small':
            return {
                padding: '0.4rem 1rem',
                fontSize: '0.75rem'
            }
        case 'tiny':
            return{
                padding: '0.4rem 0.85rem',
                fontSize: '0.65rem',
                fontWeight: '100'                
            }
        default:
            return {
                padding: '0.8rem 2rem',
                fontSize: '1rem'
            }
    }
}

// colours 
const colorPicker = (color, theme) => {
    switch (color) {
        case 'primary':
            return {
                mainColor: theme.palette.primary.main,
                darkColor: theme.palette.primary.dark,
                textColor: theme.palette.primary.contrastText,
                boxShadow: `0px 30px 60px rgba(0, 199, 102, 0.20)`,
                boxShadowHover: `0px 30px 60px rgba(0, 199, 102, 0.50)`,
                boxShadowActive: `0px 30px 60px rgba(0, 199, 102, 0.60)`,
            }
        case 'secondary':
            return {
                mainColor: theme.palette.secondary.main,
                darkColor: theme.palette.secondary.dark,
                textColor: theme.palette.secondary.contrastText,
                boxShadow: `0px 30px 60px rgba(63, 49, 107, 0.20)`,
                boxShadowHover: `0px 30px 60px rgba(63, 49, 107, 0.50)`,
                boxShadowActive: `0px 30px 60px rgba(63, 49, 107, 0.60)`,
            }
        case 'secondary-light':
            return {
                mainColor: theme.palette.secondary.light,
                darkColor: theme.palette.secondary.dark,
                textColor: theme.palette.secondary.contrastText,
                boxShadow: `0px 30px 60px rgba(63, 49, 107, 0.20)`,
                boxShadowHover: `0px 30px 60px rgba(63, 49, 107, 0.50)`,
                boxShadowActive: `0px 30px 60px rgba(63, 49, 107, 0.60)`,
            }
        case 'warning':
            return {
                mainColor: theme.palette.warning.main,
                darkColor: theme.palette.warning.dark,
                textColor: theme.palette.warning.contrastText,
                boxShadow: `0px 30px 60px rgba(243, 183, 0, 0.20)`,
                boxShadowHover: `0px 30px 60px rgba(243, 183, 0, 0.50)`,
                boxShadowActive: `0px 30px 60px rgba(243, 183, 0, 0.60)`,
            }
        case 'error':
            return {
                mainColor: theme.palette.error.main,
                darkColor: theme.palette.error.dark,
                textColor: theme.palette.error.contrastText,
                boxShadow: `0px 30px 60px rgba(237, 123, 132, 0.20)`,
                boxShadowHover: `0px 30px 60px rgba(237, 123, 132, 0.50)`,
                boxShadowActive: `0px 30px 60px rgba(237, 123, 132, 0.60)`,
            }
        case 'error-light':
            return {
                mainColor: theme.palette.error.main,
                darkColor: theme.palette.error.dark,
                textColor: theme.palette.error.contrastText,
                boxShadow: `0px 30px 60px rgba(237, 123, 132, 0.10)`,
                boxShadowHover: `0px 30px 60px rgba(237, 123, 132, 0.20)`,
                boxShadowActive: `0px 30px 60px rgba(237, 123, 132, 0.20)`,
            }
        default:
            return {
                mainColor: null,
                boxShadow: null,
                boxShadowHover: null,
                boxShadowActive: null,
                textColor: 'black'
            }
    }
}

const useStyles = makeStyles(theme => ({
    button: {
        position: 'relative',
        backgroundColor: props => {const color = colorPicker(props.color, theme); return props.variant === "contained" ? color.mainColor : null},
        color: props => {const color = colorPicker(props.color, theme); return props.variant === "contained" ? color.textColor : null},
        padding: props => {const size = sizePicker(props.size); return size.padding},
        fontSize: props => {const size = sizePicker(props.size); return size.fontSize},
        fontWeight: props => {const size = sizePicker(props.size); return size.fontWeight},
        boxShadow: props => {const color = colorPicker(props.color, theme); return props.variant === "contained" ? color.boxShadow : null},
        transition: `all .7s cubic-bezier(.2,1,.22,1)`,
        letterSpacing: '0.09em',
        marginTop: props => props.marginTop,
        marginBottom: props => props.marginBottom,
        '&:hover' : {
            backgroundColor: props => {const color = colorPicker(props.color, theme); return props.variant === "contained" ? color.darkColor : null},
            boxShadow: props => {const color = colorPicker(props.color, theme); return props.variant === "contained" ? color.boxShadowHover : null},
            transform: `translateY(-1.7px)`
        },
        '&:active' : {
            boxShadow: props => {const color = colorPicker(props.color, theme); return props.variant === "contained" ? color.boxShadowActive : null}
        },
    },
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        color: props => {const color = colorPicker(props.color, theme); return color.mainColor},
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export { useStyles }