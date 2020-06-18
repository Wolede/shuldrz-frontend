import Head from 'next/head'
import axios from "axios"
import Link from 'next/link'


const Home = ({ users }) => {
  return (
    <div>
      <Head>
        <title>Shuldrz | Here for a lean-on</title>
      </Head>
      {users.map(user => (
        <div key={user.id}>
          {user.username}
        </div>
      ))}
      <Link href="/login"><a>Login</a></Link>
      <Link href="/signup"><a>Signup</a></Link>
      <Link href="/app"><a>user home</a></Link>
    </div>
  )
}

export async function getServerSideProps() {
  const { API_URL } = process.env

  const res = await axios.get(`${API_URL}/users`)  
  const data = res.data

  return { props: {users : data} }

}
export default Home

