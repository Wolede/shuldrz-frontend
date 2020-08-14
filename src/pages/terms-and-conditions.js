import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import TandC from '../components/Layouts/HomeLayout/TandC'
import JoinBoxes from '../components/Layouts/HomeLayout/JoinBoxes'
import { Box } from '@material-ui/core'
import api from '../services/Api'


const TermsAndConditions = ({tAndC}) => {
  return (
    <div>
      <Head>
        <title>Shuldrz | Terms and Conditions</title>
      </Head>
      <MainLayout withFooter>
        <Box paddingTop='9.25rem'>
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

