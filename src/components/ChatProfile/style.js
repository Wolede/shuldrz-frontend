import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.main,
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0',
        zIndex: '10',

        // '& $MuiChip-root': {
        //     cursor:"pointer"
        // }
    },
    // overrides: {
    //     MuiChip: {
    //       clickableColorSecondary: {
    //         "&:hover, &:focus": {
    //           backgroundColor: "red"
    //         },
    //         // "&:active": {
    //         //   backgroundColor: "green"
    //         // }
    //       }
    //     }
    //   },
    icon: {
        marginLeft: '40px',
        cursor: 'pointer'
    },
    'chip': {
        // display: 'inline-block',
        cursor: 'pointer',
        // zIndex: '100'
        // '&:hover': {
        //     cursor: 'pointer'
        // }
    }

}))

export { useStyles }