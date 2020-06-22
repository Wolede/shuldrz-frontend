import Head from 'next/head'
import SignupForm from 'components/Forms/SignupForm'
import MainLayout from '../components/Layouts/MainLayout'
import FormLayout from '../components/Layouts/FormLayout'

const VolunteerSignup = () => {
    return (
        <div>
            <Head>
                <title>Shuldrz | Volunteer Signup</title>
            </Head>
            <MainLayout isLight>
                <FormLayout page="volunteer">
                    <SignupForm volunteer/>
                </FormLayout>
            </MainLayout>
        </div>
    )
}

export default VolunteerSignup
