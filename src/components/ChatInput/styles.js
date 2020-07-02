import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth : `100%`,
        margin : theme.spacing(0,0,2,0),
        backgroundColor: `white`,
        borderRadius: '30px',
        color: `black`,
        position: `relative`,
        bottom: `150px`
    },

    sendBtn: {
        color: '#00C766',
        cursor: 'pointer',
        '&:hover': {
          color: `#3f316b`
        }
      },
}));

export { useStyles }