import Head from 'next/head'
import Router from 'next/router'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import useAuth, { ProtectRoute } from 'contexts/Auth'
import { Skeleton } from "@material-ui/lab"

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
