import Head from 'next/head'
import MainLayout from 'components/Layouts/MainLayout'
import HomeLayout from '../components/Layouts/HomeLayout'
import api from '../services/Api'

const Home = ({home, heroes}) => {

  return (
    <div>
      <Head>
        <title>Shuldrz | For Perfectly Imperfect People</title>
      </Head>
      <MainLayout withFooter>
        <HomeLayout home={home} heroes={heroes}/>
      </MainLayout>
    </div>
  )
}


export async function getServerSideProps(){

  const home = await api.get(`home`)
  const heroes = await api.get(`hearts?user.userType=Volunteer&_sort=count:DESC&_limit=4`)
  return { props: { home: home.data, heroes: heroes.data } }

}

export default Home

