import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    heroJumbo: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '5rem'
        },
    },
    heroFront: {
        // width: '58.333333%',
        // [theme.breakpoints.down('md')]: {
        //     width: '100%'
        // },
    },
    textWrap: {
        position: 'absolute',
        top: 0,
        width: '58.333333%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        // '&:hover':{
        //     '& ~ #hero-back #circle': {
        //         backgroundBlendMode: 'normal'
        //     }
        // }
    },
    circleBox:{
        animation: `$bounceSlow 5s ${theme.transitions.easing.sharp} infinite`,
    },
    circleWrapper: {
        width: '42.5rem',
        height: '42.5rem',
        padding: '1.2rem',
        borderRadius: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0px 60px 80px rgba(133, 206, 158, 0.25)`,
        transition: `.4s ${theme.transitions.easing.sharp}`,
        '&:hover': {
            boxShadow: `0px 60px 80px rgba(0, 199, 102, 0.2)`,
            transform: 'translateX(26rem)',
            ['& #circle']: {
                backgroundColor: 'transparent'
            }
        },
        [theme.breakpoints.down('sm')]: {
            width: '28rem',
            height: '28rem',
        },
    },
    circle: {
        backgroundImage : props => `url(${props.heroImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '100%',
        height: '100%',
        backgroundColor: 'rgba(245, 246, 250, .45)',
        backgroundBlendMode: 'soft-light',
        transition: `background-color .6s ${theme.transitions.easing.sharp}`,
    },
    link:{
        color: theme.palette.primary.main,
        textDecoration: 'none'
    },
    '@keyframes bounceSlow': {
        '0%': {
            transform: 'translateY(0)',
        },
        '10%': {  
            transform: 'translateY(-3px)'
        },
        '30%': {
            transform: 'translateY(3px)'
        },
        '50%': {
            transform: 'translateY(-3px)'
        },
        '70%': {
            transform: 'translateY(5px)'
        },
        '90%': { 
            transform: 'translateY(0)'
        },
        '100%': {  
            transform: 'translateY(-5)'
        },
    },

}))

export { useStyles }