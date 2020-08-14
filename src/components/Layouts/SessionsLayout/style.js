import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        height: 'calc(100vh - 4rem)',
        [theme.breakpoints.down('md')]: {
            height: 'calc(100vh - 10rem)'
        },
    },
    chatContainer: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: `0px 30px 60px rgba(63, 49, 107, 0.15)`,
    }

}))

export { useStyles }