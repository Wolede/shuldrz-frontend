import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        '& a': {
            textDecoration: 'none',
        }
    },
}))

export { useStyles }