import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    link:{
        color: theme.palette.primary.main,
        fontWeight: 500,
        textDecoration: 'none'
    }
}));

export { useStyles }