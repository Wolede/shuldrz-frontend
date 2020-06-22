import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import { ProtectRoute } from 'contexts/Auth'
import { Skeleton } from "@material-ui/lab"

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
