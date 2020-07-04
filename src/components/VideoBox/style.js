import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    videoImage: {
        backgroundImage: props => props.backgroundImage ? `url(${props.backgroundImage})` : null,
        height: '25rem',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        boxShadow: '0px 15px 20px rgba(63, 50, 107, 0.25)',
        backgroundBlendMode: 'multiply',
        backgroundColor: 'rgba(4, 1, 16, .7)',
    }
}))

export { useStyles }