import Head from 'next/head'
import axios from "axios"
import Link from 'next/link'
import Login from './login'


const Home = () => {
  return (
    <Login/>
    // <div>
    //   <Head>
    //     <title>Shuldrz | Here for a lean-on</title>
    //   </Head>
    // </div>
  )
}

// export async function getServerSideProps() {
//   const { API_URL } = process.env

//   const res = await axios.get(`${API_URL}/users`)  
//   const data = res.data

//   return { props: {users : data} }

// }
export default Home

