import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    formControl: {
        minWidth : `100%`,
        margin : theme.spacing(0,0,2,0),
    },
    colorWrapper: {
        // '& .github-picker': {
        //     boxShadow: 'none !important',
        //     border: 'none !important',
        // },
        // '& span': {
        //     marginRight: theme.spacing(1),
        //     '& div':{
        //         borderRadius: '6px',
        //     }
        // }
    }
}))

export { useStyles }