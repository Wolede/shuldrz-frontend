import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import FAQ from '../components/Layouts/HomeLayout/FAQ'
import { Box } from '@material-ui/core'
import JoinBoxes from '../components/Layouts/HomeLayout/JoinBoxes'

const Faq = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Frequently Asked Questions</title>
            </Head>
            <MainLayout withFooter>
                <Box paddingTop='9.25rem'>
                    <FAQ faqPage/>  
                </Box>
                <JoinBoxes/>
            </MainLayout>
        </div>
    )
}

export default Faq
