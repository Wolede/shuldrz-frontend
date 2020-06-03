// import App from 'next/app'
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shuldrzTheme } from 'styles/theme'
import { useStyles } from 'styles/global'

const MyApp = ({ Component, pageProps }) => {
    const classes = useStyles();

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
        <ThemeProvider theme={shuldrzTheme}>
            <CssBaseline />
            <Component {...pageProps} className={classes.html}/>
        </ThemeProvider>
        </>
    )
}
  
  export default MyApp
