import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    link: {
        margin: '0 1rem 0 1rem',
        color: theme.palette.secondary.main,
        '&:hover':{
            color: theme.palette.primary.main
        }
    },
    linkBig: {
        textDecoration: 'none',
        margin: '0 1rem 0 1rem',
        color: theme.palette.secondary.main,
        '&:hover':{
            color: theme.palette.primary.main
        }
    }
}))

export { useStyles }