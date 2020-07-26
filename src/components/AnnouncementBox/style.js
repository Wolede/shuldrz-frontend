import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        '& p':{
            margin: 0,
        }
    },
}))

export { useStyles }