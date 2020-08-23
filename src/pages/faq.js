import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import FAQ from '../components/Layouts/HomeLayout/FAQ'
import { Box } from '@material-ui/core'
import JoinBoxes from '../components/Layouts/HomeLayout/JoinBoxes'
import api from '../services/Api'

const Faq = ({faq}) => {
    // console.log(faq);
    return (
        <div>
            <Head>
                <title>Shuldrz | Frequently Asked Questions</title>
            </Head>
            <MainLayout withFooter>
                <Box id='hero-front' paddingTop='9.25rem'>
                    <FAQ faqPage faqs={faq.qAndA}/>  
                </Box>
                <JoinBoxes/>
            </MainLayout>
        </div>
    )
}

export async function getServerSideProps(){

    const faq = await api.get(`faq`)
    return { props: { faq: faq.data } }

}

export default Faq
