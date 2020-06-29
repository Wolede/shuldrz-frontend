import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import { ProtectRoute } from 'contexts/Auth'
import ProfileLayout from 'components/Layouts/ProfileLayout'

const Profile = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Profile</title>
            </Head>
            <AppLayout withRightSidebar>
                <ProfileLayout />
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Profile)