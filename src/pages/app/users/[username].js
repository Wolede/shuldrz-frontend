import Head from 'next/head'
import { useRouter } from 'next/router'
import AppLayout from 'components/Layouts/AppLayout'
import { ProtectRoute } from 'contexts/Auth'
import UserPageLayout from '../../../components/Layouts/UserPageLayout'

const User = () => {
    const router = useRouter()
    const username = router.query.username
    return (
        <div>
            <Head>
                <title>Shuldrz | User</title>
            </Head>
            <AppLayout withRightSidebar otherUser={username}>
                <UserPageLayout username={username} />
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(User)
