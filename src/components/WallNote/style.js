import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    whiteSpace: 'pre-wrap',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: props => props.color,
    color: theme.palette.primary.contrastText,
    padding: '1.5rem',
    borderRadius: '1.875rem',
    width: '100%',
    height: '100%',
    '& a': {
      color: theme.palette.primary.contrastText,
    },
  },
  buttonBase: {
    width: '100%',
    textAlign: 'left',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  buttons: {
    '& button': {
      margin: '1.5rem .5rem 0 0',
    },
  },
  commentButton: {
    '& button': {
      width: '100%',
      margin: '1rem 0 .5rem 0',
    },
  },
  iconButtons: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  dedicationBadge: {
    backgroundColor: theme.palette.background.paper,
    color: props => props.color,
    position: 'absolute',
    padding: '4px 1rem 4px 1rem',
    borderRadius: `1rem 0 0 1rem`,
    top: '3.6rem',
    right: 0,
    '& span': {
      fontWeight: 600,
    },
  },
}))

export { useStyles }
