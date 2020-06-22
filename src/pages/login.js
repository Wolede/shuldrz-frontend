import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Head from 'next/head'
import LoginForm from 'components/Forms/LoginForm'
import MainLayout from 'components/Layouts/MainLayout'
import FormLayout from 'components/Layouts/FormLayout';

const Login = () => {
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            router.push('/app')
        }
    }, [])

    return (
        <div>
            <Head>
                <title>Shuldrz | Login</title>
            </Head>
            <MainLayout isLight>
                <FormLayout page="login">
                    <LoginForm />
                </FormLayout>
            </MainLayout>
            
        </div>
    )
}

export default Login
