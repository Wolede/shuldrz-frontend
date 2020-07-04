import Head from 'next/head'
import AppLayout from 'components/Layouts/AppLayout'
import { ProtectRoute } from 'contexts/Auth'
import ReviewsLayout from 'components/Layouts/ReviewsLayout'

const Reviews = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Reviews</title>
            </Head>
            <AppLayout withRightSidebar>
                <ReviewsLayout />
            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Reviews)