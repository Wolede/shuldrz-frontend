import Head from 'next/head'
import Router from 'next/router'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import useAuth, { ProtectRoute } from 'contexts/Auth'
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
    const { user, loading } = useAuth();
    // const { data: { data: pages } = {}, isValidating } = useSWR(loading ? false : '/pages', api.get)

    // const showSkeleton = isValidating || loading
    const showSkeleton = loading
    console.log(user);
    
    return (
        <div>
            <Head>
                <title>Shuldrz | App Home</title>
            </Head>
            <AppLayout withRightSidebar>

                <Paper color="secondary">
                    App Home                
                </Paper>
                {showSkeleton && <Skeleton height={40} />}
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Home)
