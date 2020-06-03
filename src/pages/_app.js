// import App from 'next/app'
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shuldrzTheme } from 'styles/theme'

  const MyApp = ({ Component, pageProps }) => {
      return (
          <>
			<ThemeProvider theme={shuldrzTheme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
          </>
      )
  }
  
  export default MyApp
