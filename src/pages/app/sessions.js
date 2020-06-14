import Head from 'next/head'
import Router from 'next/router'
import nookies from 'nookies'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'

const Sessions = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Sessions</title>
            </Head>
            <AppLayout>
                <Paper color="primary">
                    Sessions
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

export default Sessions
