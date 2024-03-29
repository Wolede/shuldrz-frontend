import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth : `100%`,
        // margin : theme.spacing(0,0,2,0),
        backgroundColor: props => props.isGroupDisabled && props.chat.groupName ? theme.palette.grey[300] : theme.palette.background.paper,
        borderRadius: '30px',
        color: `black`,
        // display: `none`
    },

    icons: {
        color: '#00C766',
        cursor: 'pointer',
        '&:hover': {
          color: `#3f316b`
        }
      },

    

    
}));

export { useStyles }