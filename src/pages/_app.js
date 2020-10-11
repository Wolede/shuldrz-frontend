// import App from 'next/app'
import React from 'react';
import 'swiper/swiper-bundle.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'styles/nprogress.css'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shuldrzTheme } from 'styles/theme'
import { useStyles } from 'styles/global'
import ContextWrapper from '../contexts/ContextWrapper';
import { SWRConfig } from 'swr'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import axios from 'axios'
const firebase = require("firebase");
require("firebase/firestore");
require("@firebase/messaging")

try{
    firebase.initializeApp({
        apiKey: "AIzaSyBJ8MGYaFEDfGnvMeKyeoNgT0i3ch7-8JA",
        authDomain: "shuldrz-chat.firebaseapp.com",
        databaseURL: "https://shuldrz-chat.firebaseio.com",
        projectId: "shuldrz-chat",
        storageBucket: "shuldrz-chat.appspot.com",
        messagingSenderId: "138433830895",
        appId: "1:138433830895:web:ce57ed0cb1d1ee54f1201a"
    });

    
    
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack)
    }
}

//Binding Progress bar to router
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());



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
        <DefaultSeo {...SEO} />
        <ThemeProvider theme={shuldrzTheme}>
            <CssBaseline />
            <SWRConfig value={{ fetcher: (url) => axios(url).then(res => res.data) }}>
                <ContextWrapper>
                    <Component {...pageProps} className={classes.html}/>
                </ContextWrapper>
            </SWRConfig>
        </ThemeProvider>
        </>
    )
}

export default MyApp
