import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    button: {
        position: 'relative',
        padding: `1rem 2.5rem`,
        boxShadow: `0px 10px 20px rgba(17,122,243,0.20)`,
        transition: `all .7s cubic-bezier(.2,1,.22,1)`,
        '&:hover' : {
            boxShadow: `0px 10px 20px rgba(17,122,243,0.30)`,
            transform: `translateY(-3px)`
        },
        '&:active' : {
            boxShadow: `0px 10px 20px rgba(17,122,243,0.60)`
        },
    },
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        color: theme.palette.primary.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export { useStyles }