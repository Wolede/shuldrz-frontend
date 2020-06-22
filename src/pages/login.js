import Head from 'next/head'
import LoginForm from 'components/Forms/LoginForm'
import MainLayout from 'components/Layouts/MainLayout'
import FormLayout from 'components/Layouts/FormLayout';

const Login = () => {
   
  

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
