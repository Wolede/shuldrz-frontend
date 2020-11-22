import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        maxHeight: '500px',
        overflowY: 'scroll',
        borderRadius: `1.875rem`
    },
}))

export { useStyles }