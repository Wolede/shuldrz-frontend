import Head from 'next/head'
import SignupForm from 'components/Forms/SignupForm'
import MainLayout from 'components/Layouts/MainLayout'
import FormLayout from 'components/Layouts/FormLayout';

const Signup = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Signup</title>
            </Head>
            <MainLayout isLight>
                <FormLayout page="signup">
                    <SignupForm />
                </FormLayout>
            </MainLayout>

            
        </div>
    )
}

// export async function getServerSideProps(ctx) {
//     const isAuthenticated = nookies.get(ctx).token
//     // console.log(isAuthenticated, 'cookietoken')
//     if (isAuthenticated) {
//         if (typeof window !== 'undefined') {
//             Router.push("/app")
//         } else {
//             if (ctx.res) {
//                 ctx.res.writeHead(301, {
//                     Location: '/app'
//                 })
//                 ctx.res.end()
//             }
//         }
//         return {props: {isAuthenticated : true}}
//     } else {
//         return {props: {isAuthenticated : false}}
//     }
// }
export default Signup
