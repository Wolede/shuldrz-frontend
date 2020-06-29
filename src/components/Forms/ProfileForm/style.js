import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    fieldWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > * ' : {
            minWidth: '100%',
            margin: theme.spacing(0,0,4,0),

            [theme.breakpoints.up('sm')]: {
                minWidth: '25ch',
                margin: theme.spacing(0,2,4,0),
            }

        }
    },
    grouping: {
        flexDirection: 'row'
    }
}))

export { useStyles }