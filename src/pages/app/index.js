import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import { ProtectRoute } from 'contexts/Auth'
import { Skeleton } from "@material-ui/lab"

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyBJ8MGYaFEDfGnvMeKyeoNgT0i3ch7-8JA",
    authDomain: "shuldrz-chat.firebaseapp.com",
    databaseURL: "https://shuldrz-chat.firebaseio.com",
    projectId: "shuldrz-chat",
    storageBucket: "shuldrz-chat.appspot.com",
    messagingSenderId: "138433830895",
    appId: "1:138433830895:web:ce57ed0cb1d1ee54f1201a"
});

const Home = () => {
    
    return (
        <div>
            <Head>
                <title>Shuldrz | App Home</title>
            </Head>
            <AppLayout withRightSidebar>

                <Paper color="secondary">
                    App Home                
                </Paper>
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Home)
