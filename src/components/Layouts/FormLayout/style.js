import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh'
      },
      grid: {
        minHeight: '100vh',
        [theme.breakpoints.down('md')]: {
            minHeight: '900px'
        }
      },
      quoteContainer: {
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        }
      },
      quote: {
        backgroundColor: 'rgba(4, 1, 16, .7)',
        backgroundBlendMode: 'multiply',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(5, 6),
        backgroundImage: (props) => {
          switch (props.page) {
            case 'login':
              return 'url(/images/GuestLogin.jpg)'
            case 'signup':
              return 'url(/images/GuestSignup.jpg)'
            case 'volunteer':
              return 'url(/images/VolunteerSignup.jpg)'
            default:
              break;
          }
        },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
      },
      quoteHeader: {
        color: theme.palette.background.default,
        marginBottom: '0.5rem'
      },
      quoteText: {
        color: theme.palette.background.default,
        marginBottom: '0.5rem',
        fontFamily: 'Jost, Helvetica, sans-serif',
        fontWeight: 400
      },
      quoteAction: {
        padding: theme.spacing(6, 0, 0, 0),
      },
      name: {
        marginTop: theme.spacing(3),
        color: theme.palette.background.default
      },
      bio: {
        color: theme.palette.background.default
      },
      contentContainer: {},
      content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: props => props.page === 'volunteer' ? theme.spacing(5, 14) : theme.spacing(5, 19),
        [theme.breakpoints.down('sm')]: {
            padding: props => props.page === 'volunteer' ? theme.spacing(5, 6) : theme.spacing(5, 6),
        },
        // padding: theme.spacing(15, 19),
        // [theme.breakpoints.down('md')]: {
        //     padding: theme.spacing(15, 4),
        // }
      },
      contentHeader: {
        // display: 'flex',
        // alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(4),
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2)
      },
      headerText: {
          marginBottom: '0.5rem'
      },
      contentText: {
          fontFamily: 'Jost, Helvetica, sans-serif',
          fontWeight: 400
      },
      logoImage: {
        marginLeft: theme.spacing(4)
      },
      contentBody: {
          width: '20.5rem',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
        // flexGrow: 1,
        // display: 'flex',
        // alignItems: 'center',
        // [theme.breakpoints.down('md')]: {
        //   justifyContent: 'center'
        // }
      },
      form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2)
        }
      },
      title: {
        marginTop: theme.spacing(3)
      },
      socialButtons: {
        marginTop: theme.spacing(3)
      },
      socialIcon: {
        marginRight: theme.spacing(1)
      },
      sugestion: {
        marginTop: theme.spacing(2)
      },
      textField: {
        marginTop: theme.spacing(2)
      },
      signInButton: {
        margin: theme.spacing(2, 0)
      }
}))

export { useStyles }