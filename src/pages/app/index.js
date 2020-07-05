import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import { ProtectRoute } from 'contexts/Auth'
import JourneyLayout from 'components/Layouts/JourneyLayout'


const Home = () => {
    
    return (
        <div>
            <Head>
                <title>Shuldrz | App Home</title>
            </Head>
            <AppLayout withRightSidebar>
                <JourneyLayout />
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Home)
