import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    subHeader: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '3.8rem'
        },
    },
}))

export { useStyles }