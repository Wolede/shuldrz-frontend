import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {},
    item: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: '2rem',
    },
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
                stroke: theme.palette.primary.main
            },
            '& p':{
                color: theme.palette.primary.main
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
    activeButton: {
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
        '& svg' : {
            stroke: theme.palette.primary.main
        },
        '& p':{
            color: theme.palette.primary.main
        }
    }
}))

export { useStyles }