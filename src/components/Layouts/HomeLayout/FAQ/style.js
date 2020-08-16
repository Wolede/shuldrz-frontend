import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        boxShadow: `0px 10px 30px rgba(13, 206, 158, 0.1)`,
        padding: '1rem'
    },
    subHeader: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '3.8rem'
        },
    },
}))

export { useStyles }