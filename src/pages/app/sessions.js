import Head from 'next/head'
import Router from 'next/router'
import nookies from 'nookies'

const Sessions = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Sessions</title>
            </Head>
            Sessions
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
