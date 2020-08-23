import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import { ProtectRoute } from 'contexts/Auth'
import WallLayout from 'components/Layouts/WallLayout'

const Wall = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Wall</title>
            </Head>
            <AppLayout>
                <WallLayout isPublic={false} />
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Wall)
