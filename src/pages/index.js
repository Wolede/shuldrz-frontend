import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import HomeLayout from '../components/Layouts/HomeLayout'
import api from '../services/Api'

const Home = ({home}) => {
  console.log(home);

  return (
    <div>
      <Head>
        <title>Shuldrz | Here for a lean-on</title>
      </Head>
      <MainLayout withFooter>
        <HomeLayout home={home}/>
      </MainLayout>
    </div>
  )
}


export async function getServerSideProps(){

  const home = await api.get(`home`)
  return { props: { home: home.data } }

}

export default Home

