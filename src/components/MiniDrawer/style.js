import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        width: props => props.width,
        position: props => props.position,
        overflow: props => props.overflow,
        left: props => props.position ? 0 : 0,
        top: props => props.position ? 0 : 0,
        zIndex: props => props.position ? 9 : null,
        height: '100%',
        maxWidth: '100%',
        borderRadius:'1.875rem',
        [theme.breakpoints.up("lg")]: {
            borderRadius:'1.875rem 0 0 1.875rem',
        },
        backgroundColor: props => props.backgroundPaper ? theme.palette.background.paper : 'none',
    }
}))

export { useStyles }