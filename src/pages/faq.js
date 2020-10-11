import MainLayout from 'components/Layouts/MainLayout'
import FAQ from '../components/Layouts/HomeLayout/FAQ'
import { Box } from '@material-ui/core'
import JoinBoxes from '../components/Layouts/HomeLayout/JoinBoxes'
import api from '../services/Api'
import { NextSeo } from 'next-seo'

const Faq = ({faq}) => {
    const SEO = {
        title: 'Shuldrz | Frequently Asked Questions',
        description: 'Frequently Asked Questions',
    
        openGraph: {
            title: 'Shuldrz | Frequently Asked Questions',
            description: 'Frequently Asked Questions',
        }
      }
    return (
        <div>
            <NextSeo {...SEO}/>
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
