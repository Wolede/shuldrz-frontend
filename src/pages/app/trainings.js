import Head from 'next/head'
import Router from 'next/router'
import useSWR, { mutate } from 'swr'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import useAuth, { ProtectRoute } from 'contexts/Auth'
import { Skeleton } from "@material-ui/lab"

const Trainings = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Trainings</title>
            </Head>
            <AppLayout withRightSidebar>
                <Paper color="error">
                    Trainings
                </Paper>
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Trainings)