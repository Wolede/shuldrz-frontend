import Head from 'next/head'
import Router from 'next/router'
import nookies from 'nookies'
import Logout from 'components/Logout'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'


const Home = () => {
    console.log(nookies.get().token);
    
    return (
        <div>
            <Head>
                <title>Shuldrz | App Home</title>
            </Head>
            <AppLayout withRightSidebar>

                <Paper color="secondary">
                    App Home
                <Logout/>
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
