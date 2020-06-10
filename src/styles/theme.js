import { createMuiTheme } from '@material-ui/core/styles';

// Colour Profiles
const shuldrzGreen = {
  main : '#00C766',
  contrastText : '#FFFFFF',
}
const shuldrzPurple = {
  main : '#3F316B',
  contrastText : '#F5F6FA'
}
const shuldrzYellow = {
  main : '#F3B700',
  contrastText : '#F5F6FA'
}
const shuldrzRed = {
  main : '#FD4659',
  contrastText : '#F5F6FA'
}
const shuldrzWhite = {
  main : '#FFFFFF',
  contrastText : '#3F316B'
}
const shuldrzLight = {
  main : '#F5F6FA',
  contrastText : '#3F316B'
}
const shuldrzGrey = {
  main : '#838A97',
  contrastText : '#292F36'
}
const shuldrzDark = {
  main : '#292F36',
  contrastText : '#F5F6FA'
}


// Create a theme instance.
const shuldrzTheme = createMuiTheme({
  palette: {
    primary: shuldrzGreen,
    secondary: shuldrzPurple,
    error: shuldrzRed,
    warning: shuldrzYellow,
    text : {
      primary: shuldrzPurple.main,
      secondary: shuldrzGrey.main
    },
    background: {
      paper: shuldrzLight.main,
      default: shuldrzLight.main,
    },
    type: 'light',
  },
  shape : {
    borderRadius : 60
  },
  breakpoints : {
    values : {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl : 1600
    }
  },
  typography : {
      fontFamily : 'Jost, Sen, Helvetica, sans-serif',
      h1 : {
        fontFamily: 'Sen, Jost, Helvetica, sans-serif',
        fontWeight: 700,
        fontSize: '7.5rem'
      },
      h2 : {
        fontFamily: 'Sen, Jost, Helvetica, sans-serif',
        fontWeight: 700,
        fontSize: '5rem'
      },
      h3 : {
        fontFamily: 'Sen, Jost, Helvetica, sans-serif',
        fontWeight: 500,
        fontSize: '3rem'
      },
      h4 : {
        fontFamily: 'Sen, Jost, Helvetica, sans-serif',
        fontWeight: 500,
        fontSize: '1.875rem'
      },
      h5 : {
        fontFamily: 'Sen, Jost, Helvetica, sans-serif',
        fontWeight: 500,
        fontSize: '1.5rem'
      },
      subtitle1 : {
        fontFamily: 'Jost, Sen, Helvetica, sans-serif',
        fontWeight: 500,
        fontSize: `1.5rem`
      },
      subtitle2 : {
        fontFamily: 'Jost, Sen, Helvetica, sans-serif',
        fontWeight: 400,
        fontSize: `2rem`
      },
      body1 : {
        fontFamily: 'Jost, Sen, Helvetica, sans-serif',
        fontWeight: 400,
        fontSize: `1rem`
      },
      body2 : {
        fontFamily: 'Jost, Sen, Helvetica, sans-serif',
        fontWeight: 500,
        fontSize: `1rem`
      },
      caption : {
        fontFamily: 'Jost, Sen, Helvetica, sans-serif',
        fontWeight: 400,
        fontSize: `0.75rem`
      },
      button : {
        fontFamily: 'Jost, Sen, Helvetica, sans-serif',
        fontWeight: 500,
        fontSize: `1rem`
      }
  }
});

// console.log(shuldrzTheme)
export { shuldrzTheme };