import MainLayout from 'components/Layouts/MainLayout'
import TandC from '../components/Layouts/HomeLayout/TandC'
import JoinBoxes from '../components/Layouts/HomeLayout/JoinBoxes'
import { Box } from '@material-ui/core'
import api from '../services/Api'
import { NextSeo } from 'next-seo'

const TermsAndConditions = ({tAndC}) => {
  const SEO = {
    title: 'Shuldrz | Terms and Conditions',
    description: 'Read Terms and Conditions',

    openGraph: {
        title: 'Shuldrz | Terms and Conditions',
        description: 'Read Terms and Conditions',
    }
  }

  return (
    <div>
      <NextSeo {...SEO}/>
      <MainLayout withFooter>
        <Box id='hero-front' paddingTop='9.25rem'>
            <TandC terms={tAndC}/>
        </Box>
        <JoinBoxes/>
      </MainLayout>
    </div>
  )
}

export async function getServerSideProps(){

  const tAndC = await api.get(`t-and-c`)
  return { props: { tAndC: tAndC.data } }

}

export default TermsAndConditions

