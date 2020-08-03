import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import TandC from '../components/Layouts/HomeLayout/TandC'
import JoinBoxes from '../components/Layouts/HomeLayout/JoinBoxes'
import { Box } from '@material-ui/core'


const TermsAndConditions = () => {
  return (
    <div>
      <Head>
        <title>Shuldrz | Terms and Conditions</title>
      </Head>
      <MainLayout withFooter>
        <Box paddingTop='9.25rem'>
            <TandC/>
        </Box>
        <JoinBoxes/>
      </MainLayout>
    </div>
  )
}

export default TermsAndConditions

