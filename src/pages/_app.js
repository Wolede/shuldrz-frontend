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
import 'emoji-mart/css/emoji-mart.css';
import { firebaseConfig } from 'services/Api.js'

const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/storage");
require("@firebase/messaging")


try {
	firebase.initializeApp(firebaseConfig);

	// API_URL=https://shuldrz-strapi.herokuapp.com
	// FIREBASE_API_KEY="AIzaSyBJ8MGYaFEDfGnvMeKyeoNgT0i3ch7-8JA"
	// FIREBASE_AUTH_DOMAIN="shuldrz-chat.firebaseapp.com"
	// FIREBASE_DB_URL="https://shuldrz-chat.firebaseio.com"
	// FIREBASE_PROJECT_ID="shuldrz-chat"
	// FIREBASE_STORAGE_BUCKET="shuldrz-chat.appspot.com"
	// FIREBASE_MESSAGING_SENDER_ID="138433830895"
	// FIREBASE_APP_ID="1:138433830895:web:ce57ed0cb1d1ee54f1201a"

	// 	API_URL=https://shuldrz-strapi.herokuapp.com
	// FIREBASE_API_KEY="AIzaSyANHygUmqxZhbgku31gsyOgjl6QOvtkMco"
	// FIREBASE_AUTH_DOMAIN="shuldrz-chat-test.firebaseapp.com
	// FIREBASE_DB_URL="https://shuldrz-chat-test.firebaseio.com"
	// FIREBASE_PROJECT_ID="shuldrz-chat-test"
	// FIREBASE_STORAGE_BUCKET="shuldrz-chat-test.appspot.com"
	// FIREBASE_MESSAGING_SENDER_ID="148415518343"
	// FIREBASE_APP_ID="1:148415518343:web:b3ce13f58b5b9dceb6ca22"

} catch (err) {
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
						<Component {...pageProps} className={classes.html} />
					</ContextWrapper>
				</SWRConfig>
			</ThemeProvider>
		</>
	)
}

export default MyApp
