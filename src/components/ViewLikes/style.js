import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
    cursor: 'pointer',
  },
  avatarGroup: {
    marginRight: '0.5rem',
    '& > *': {
      width: theme.spacing(4),
      height: theme.spacing(4),
      fontSize: '.75rem',
      border: '1px solid',
    },
  },
}))

export { useStyles }
