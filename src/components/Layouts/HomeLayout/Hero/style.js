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
    circleWrapper: {
        width: '42.5rem',
        height: '42.5rem',
        padding: '1.2rem',
        borderRadius: '100%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0px 60px 80px rgba(133, 206, 158, 0.25)`,
        transition: '0.2s cubic-bezier(.17,.67,.83,.67)',
        // transition: '0.2s cubic-bezier(.17,.67,.83,.67)',
        '&:hover': {
            boxShadow: `0px 60px 80px rgba(0, 199, 102, 0.2)`,
            transform: 'translateX(26rem)',
            ['& #circle']: {
                backgroundBlendMode: 'normal'
            }
        },
        [theme.breakpoints.down('sm')]: {
            width: '28rem',
            height: '28rem',
        },
    },
    circle: {
        backgroundImage : 'url(/images/scenic-view.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '100%',
        height: '100%',
        backgroundColor: 'rgba(245, 246, 250, .45)',
        backgroundBlendMode: 'soft-light'
    },
    link:{
        color: theme.palette.primary.main,
        // fontWeight: 500,
        textDecoration: 'none'
    }

}))

export { useStyles }