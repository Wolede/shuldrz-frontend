

import AppLayout from 'components/Layouts/AppLayout'
import Head from 'next/head'
import { ProtectRoute } from '../../contexts/Auth'
import SessionsLayout from 'components/Layouts/SessionsLayout'

const Sessions = () => {

   

    return (
        <div>
            <Head>
                <title>Shuldrz | Sessions</title>
            </Head>
            <AppLayout>
               <SessionsLayout/>
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Sessions)
