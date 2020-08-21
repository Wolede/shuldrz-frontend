import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import WallLayout from 'components/Layouts/WallLayout'

const PublicWall = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Wall</title>
            </Head>
            <MainLayout withFooter>
                <WallLayout public={true} />
            </MainLayout>
        </div>
    )
}

export default PublicWall
