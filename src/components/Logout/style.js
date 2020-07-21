import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    button: {
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium,
        '& .MuiButton-label' : {
            display: 'flex',
            flexDirection: 'column',
        },
        '& :hover':{
            '& svg' : {
                stroke: theme.palette.error.main
            },
            '& p':{
                color: theme.palette.error.main
            }
        }
    },
    icon: {
        color: theme.palette.icon,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            stroke: '#838A97',
        },
    },
    menuText: {
        fontSize: '1.5rem',
        fontWeight: '400',
        color: '#838A97',
    },
}))

export { useStyles }