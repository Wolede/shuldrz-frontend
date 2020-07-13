import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import { ProtectRoute } from 'contexts/Auth'
import BuddiesLayout from 'components/Layouts/BuddiesLayout'

const Buddies = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Buddies</title>
            </Head>
            <AppLayout withRightSidebar>
                <BuddiesLayout />
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Buddies)
