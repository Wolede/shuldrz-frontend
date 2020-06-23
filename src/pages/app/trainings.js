import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import { ProtectRoute } from 'contexts/Auth'
import TrainingsLayout from 'components/Layouts/TrainingsLayout'

const Trainings = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Trainings</title>
            </Head>
            <AppLayout withRightSidebar>
                <TrainingsLayout/>
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Trainings)