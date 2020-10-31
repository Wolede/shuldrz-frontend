import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import SignupForm from 'components/Forms/SignupForm'
import MainLayout from 'components/Layouts/MainLayout'
import FormLayout from 'components/Layouts/FormLayout';
import { NextSeo } from 'next-seo'
const Signup = () => {

    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            router.push('/app')
        }
    }, [])

    const SEO = {
        title: 'Shuldrz | Bud Sign up',
        description: 'Sign up as a Bud',
    
        openGraph: {
            title: 'Shuldrz | Bud Sign up',
            description: 'Sign up as a bud',
          images: [
            {
              url: 'https://shuldrz.com/images/GuestSignup.jpg',
              width: 1200,
              height: 1200,
              alt: 'Shuldrz Bud Sign up',
            },
          ]
        }
      }

    return (
        <div id='hero-front'>
            <NextSeo {...SEO}/>
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
