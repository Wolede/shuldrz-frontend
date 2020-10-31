import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
    },
    badgeContent: {
        padding: '.2rem .7rem',
        background: props => props.userType === "Volunteer" ? theme.palette.warning.main : theme.palette.secondary.main,
        color: theme.palette.background.paper,
        borderRadius: '30px',
        marginTop: '-1.2rem',
    }
}))

export { useStyles }