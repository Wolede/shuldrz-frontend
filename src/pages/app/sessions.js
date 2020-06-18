import Head from 'next/head'
import Router from 'next/router'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import useAuth, { ProtectRoute } from 'contexts/Auth'
import { Skeleton } from "@material-ui/lab"

const Sessions = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Sessions</title>
            </Head>
            <AppLayout>
                <Paper color="primary">
                    Sessions
                </Paper>
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Sessions)
