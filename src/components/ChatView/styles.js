import { makeStyles } from '@material-ui/core/styles'
import { shuldrzTheme } from '../../styles/theme'

const colorPicker = (color, theme) => {
    switch (color) {
        case 'primary':
            return {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: `0px 30px 60px rgba(0, 199, 102, 0.20)`,
            }
        case 'secondary':
            return {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                boxShadow: `0px 30px 60px rgba(63, 49, 107, 0.20)`,
            }
        case 'warning':
            return {
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                boxShadow: `0px 30px 60px rgba(243, 183, 0, 0.20)`,
            }
        case 'error':
            return {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                boxShadow: `0px 30px 60px rgba(237, 123, 132, 0.20)`,
            }
        default:
            return {
                backgroundColor: theme.palette.background.paper,
                color: null,
                boxShadow: `0px 30px 60px rgba(0, 199, 102, 0.20)`,
            }
    }
}

const useStyles = makeStyles(theme => ({
    
    headerButtons : {
        '& > *' : {
            marginLeft: '.5rem'
        }
    },

    userSent: {
        display: 'flex',
        justifyContent: 'flex-end',

        [' & > div '] : {
            backgroundColor: '#F3B700',
            color: 'white',
            width: 'fit-content',
            maxWidth: '90%',
            borderRadius: '1.8rem 0.6rem 0.6rem 1.8rem',
            padding: '1rem 1.5rem',
            wordWrap: 'break-word',
            marginTop: '1rem',
        },

        '& .timestamp' : {
            fontSize: '.7rem',
            fontWeight: '500',
            textAlign: 'right'
        },
    },

    friendSent: {
        display: 'flex',
        justifyContent: 'flex-start',

        [' & > div '] : {
            backgroundColor: '#00C766',
            color: 'white',
            width: 'fit-content',
            maxWidth: '90%',
            borderRadius: '0.6rem 1.8rem 1.8rem 0.6rem',
            padding: '1rem 1.5rem',
            wordWrap: 'break-word',
            marginTop: '1rem',
        },

        '& .timestamp' : {
            fontSize: '.7rem',
            fontWeight: '500',
            textAlign: 'right'
        },
    },

    chatHeader: {
        
        width: '57%',
        height: '100px',
        display: `flex`,
        position: `absolute`,
        fontSize: '18px',
        textAlign: 'center',
        color: 'white',
        boxSizing: 'border-box',
        backgroundColor: `#3f316b` ,
        overflow: `hidden`,
        padding:`2rem`,
        // top: `22px`
    },

    chatHeaderLink: {
        position: `absolute`,
        display: `flex`,
        backgroundColor: `inherit`
    },

    chatHeaderSession: {
        position: `absolute`,
        left: '57%',
        backgroundColor: `inherit`,

        '& button:not(:last-child)':{
            marginRight: `1rem`
        },

    },



    secondary:{  
        backgroundColor:'#9D8CD4' 
    },

    chatAvatar: {
        height: `45px`

    },

    h5: {
        marginLeft: '24px'
    },



}))

export { useStyles }