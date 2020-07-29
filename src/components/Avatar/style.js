import { makeStyles } from '@material-ui/core/styles'

const sizePicker = (size) => {
    switch (size) {
        case 'tiny':
            return {
                width: '3.125rem',
                height: '3.125rem',
                borderRadius: '1.25rem',
            }
        case 'small':
            return {
                width: '7.5rem',
                height: '6.75rem',
                borderRadius: '1.8rem',
            }
        case 'medium':
            return {
                width: '9.375rem',
                height: '9.375rem',
                borderRadius: '1.875rem',
            }
        case 'large':
            return {
                width: '13.75rem',
                height: '13.75rem',
                borderRadius: '1.875rem',
            }
        case 'huge':
            return {
                width: '18.125rem',
                height: '18.125rem',
                borderRadius: '3.75rem',
            }
        default:
            return {
                width: '6.25rem',
                height: '6.25rem',
                borderRadius: '1.875rem',
            }
    }
}
const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: props => {const size = sizePicker(props.size); return size.borderRadius},
        width: props => {const size = sizePicker(props.size); return props.autoWidth ? '100%' : size.width;},
        height: props => {const size = sizePicker(props.size); return size.height},
        marginBottom: props =>  props.marginBottom,
        margin: props => props.margin,
        boxShadow: `0px 15px 20px rgba(63, 49, 107, 0.25)`,
    }
}))

export { useStyles }