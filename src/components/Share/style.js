import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        '& a': {
            textDecoration: 'none',
            margin: '1.5rem .5rem 0 0',
        },
    },
}))

export { useStyles }