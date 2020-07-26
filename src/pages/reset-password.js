import React from 'react'
import MainLayout from '../components/Layouts/MainLayout'
import ResetPasswordForm from '../components/Forms/ResetPasswordForm'

const ResetPassword = () => {
    return (
        <div>
            <MainLayout isLight>
                    <ResetPasswordForm/>
            </MainLayout>
        </div>
    )
}

export default ResetPassword
