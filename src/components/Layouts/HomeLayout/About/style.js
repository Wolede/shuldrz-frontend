import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    subHeader: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '3.8rem'
        },
    },
    gridOne: {
        paddingBottom: '0 !important'
    },
    gridTwo: {
        paddingTop: '0 !important'
    }
}))

export { useStyles }