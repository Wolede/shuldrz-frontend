import Head from 'next/head'
import Router from 'next/router'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import useAuth, { ProtectRoute } from 'contexts/Auth'
import { Skeleton } from "@material-ui/lab"

const Reviews = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Reviews</title>
            </Head>
            <AppLayout withRightSidebar>
                <Paper color="warning">
                    Reviews
                </Paper>
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Reviews)