import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import SignupForm from 'components/Forms/SignupForm'
import MainLayout from '../components/Layouts/MainLayout'
import FormLayout from '../components/Layouts/FormLayout'
import { NextSeo } from 'next-seo'

const VolunteerSignup = () => {

    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            router.push('/app')
        }
    }, [])

    const SEO = {
        title: 'Shuldrz | Buddy Sign up',
        description: 'Sign up as a buddy',
    
        openGraph: {
            title: 'Shuldrz | Buddy Sign up',
            description: 'Sign up as a buddy',
          images: [
            {
              url: 'https://shuldrz.com/images/VolunteerSignup.jpg',
              width: 1200,
              height: 1200,
              alt: 'Shuldrz Buddy Sign up',
            },
          ]
        }
      }

    return (
        <div>
            <NextSeo {...SEO}/>
            <MainLayout isLight>
                <FormLayout page="volunteer">
                    <SignupForm volunteer/>
                </FormLayout>
            </MainLayout>
        </div>
    )
}

export default VolunteerSignup
