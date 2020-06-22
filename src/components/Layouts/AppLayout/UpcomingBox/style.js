import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        overflowY: 'scroll',
        height: '19.75rem'
    },
    text: { marginBottom: '2rem' },
    card: { 
        display: 'flex', 
        borderRadius: '30px',
        backgroundColor: theme.palette.background.default,
        boxShadow: 'none',
        padding: '0.5rem',
        marginBottom: '1rem'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    offsetButton: {
        position: 'absolute',
        right: '1rem',
        bottom: '-0.5rem',
        boxShadow: 'none',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    text: {
        marginBottom: '0.5rem',
        display: 'block'     
    },
    caption: {
        fontWeight: '500'
    },
    '*::-webkit-scrollbar': {
        width: '0.4rem'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.2)',
        borderRadius: '8px'
      }
}))

export { useStyles }