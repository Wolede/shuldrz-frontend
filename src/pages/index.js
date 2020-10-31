import MainLayout from 'components/Layouts/MainLayout'
import HomeLayout from '../components/Layouts/HomeLayout'
import api from '../services/Api'
import { NextSeo } from 'next-seo'

const Home = ({home, heroes}) => {
  const SEO = {
    title: 'Shuldrz | For Perfectly Imperfect People',
    description: home.aboutContent,

    openGraph: {
      title: `Shuldrz | For Perfectly Imperfect People`,
      description: home.aboutContent,
      images: [
        {
          url: home.heroImage.url,
          width: 1200,
          height: 1200,
          alt: 'Shuldrz Home',
        },
      ]
    }
  }

  return (
    <div>
      <NextSeo {...SEO}/>
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

