import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: props => props.paddingTop,
        paddingBottom: props => props.paddingBottom,
        textAlign: props => props.textAlign,

    },
}));

export { useStyles }