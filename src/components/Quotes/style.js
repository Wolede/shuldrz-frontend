import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width: 'fit-content',
        height: 'fit-content',
        transition: `.4s ${theme.transitions.easing.sharp}`,
        backgroundColor: theme.palette.background.paper,
        position: 'fixed',
        right: 0,
        top: 'calc(100vh - 14rem)',
        borderTopLeftRadius: open => open ? '3.75rem' : '1.4rem',
        borderBottomLeftRadius: open => open ? 0 : '1.4rem',
        cursor: open => open ? 'auto' : 'pointer',
    },

    iconRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.1rem 1rem 1rem 1.1rem',
    },
    icon: {
        fontSize: '3.75rem'
    },
    close: {
        cursor: 'pointer'
    },
    slideInBox: {
        padding: '1.1rem 1rem 1rem 1.1rem',
        [theme.breakpoints.up('xs')]: {
            height: '15.5rem',
        },
        [theme.breakpoints.up('sm')]: {
            height: '15rem',
        },
        [theme.breakpoints.up('md')]: {
            height: '14rem',
        },
        height: '14rem',

        maxWidth: '27rem',
    },
    quoteIcon: {
        fontSize: '3.75rem'
    },
    swiper: {
        height: '57%',
        '& > .swiper-pagination' :{
            bottom: 0,
        },
        '& > .swiper-pagination .swiper-pagination-bullet-active':{
            backgroundColor: theme.palette.primary.main,
        },
        '& > .swiper-pagination .swiper-pagination-bullet': {
            backgroundColor: 'rgba(0, 199, 102, .9)'
        }
    },
    slide: {
        cursor: 'e-resize',
    }

}))

export { useStyles }