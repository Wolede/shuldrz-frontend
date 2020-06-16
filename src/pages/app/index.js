import { useContext } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import nookies from 'nookies'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import { AuthContext } from 'contexts/AuthContext'

const Home = () => {

    const { auth } = useContext(AuthContext)

    console.log(auth, 'lol')
    return (
        <div>
            <Head>
                <title>Shuldrz | App Home</title>
            </Head>
            <AppLayout withRightSidebar>

                <Paper color="secondary">
                    App Home                
                </Paper>
                
            </AppLayout>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const isAuthenticated = nookies.get(ctx).token
    // console.log(isAuthenticated, 'cookietoken')
    if (!isAuthenticated) {
        if (typeof window !== 'undefined') {
            Router.push("/login")
        } else {
            if (ctx.res) {
                ctx.res.writeHead(301, {
                    Location: '/login'
                })
                ctx.res.end()
            }
        }
        return {props: {isAuthenticated : true}}
    } else {
        return {props: {isAuthenticated : false}}
    }
}

export default Home
