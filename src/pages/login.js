import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import LoginForm from 'components/Forms/LoginForm'
import MainLayout from 'components/Layouts/MainLayout'
import FormLayout from 'components/Layouts/FormLayout';
import { NextSeo } from 'next-seo'

const Login = () => {
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            router.push('/app')
        }
    }, [])

    const SEO = {
        title: 'Shuldrz | Login',
        description: 'Login',
    
        openGraph: {
            title: 'Shuldrz | Login',
            description: 'Login',
          images: [
            {
              url: 'https://shuldrz.com/images/GuestLogin.jpg',
              width: 1200,
              height: 1200,
              alt: 'Shuldrz Login',
            },
          ]
        }
      }

    return (
        <div id='hero-front'>
            <NextSeo {...SEO}/>
            <MainLayout isLight>
                <FormLayout page="login">
                    <LoginForm />
                </FormLayout>
            </MainLayout>
            
        </div>
    )
}

export default Login
