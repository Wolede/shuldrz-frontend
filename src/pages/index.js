import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import HomeLayout from '../components/Layouts/HomeLayout'


const Home = () => {
  return (
    <div>
      <Head>
        <title>Shuldrz | Here for a lean-on</title>
      </Head>
      <MainLayout>
        <HomeLayout/>
      </MainLayout>
    </div>
  )
}

export default Home

