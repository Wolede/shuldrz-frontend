import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        marginBottom: "2.5rem",
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    formControl: {
        minWidth : `100%`,
        margin : theme.spacing(0,0,2,0),
    },
    childRoot: {
        paddingLeft: theme.spacing(3),
        '& > *': {
            marginRight: theme.spacing(2)
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            marginTop: '2rem'
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            '& > *': {
                marginBottom: theme.spacing(1)
            },
        }
    },
    buttonProgress: {
        color: theme.palette.warning.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export { useStyles }