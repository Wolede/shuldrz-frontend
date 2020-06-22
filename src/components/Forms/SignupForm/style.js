import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth : `100%`,
        margin : theme.spacing(0,0,2,0),
    }
}));

export { useStyles }