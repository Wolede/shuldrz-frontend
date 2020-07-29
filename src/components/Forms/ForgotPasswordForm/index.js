import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Box, Typography, TextField, FormControlLabel, Switch, FormControl, FormHelperText } from '@material-ui/core'
import Button from 'components/Button'
import { useStyles } from './style'
import api from 'services/Api'

const ForgotPasswordForm = props => {
    const classes = useStyles()
    const [isSuccessful, setIsSuccessful] = useState()

    
    const initialValues = {
        email: '',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format!').required('Email is empty!'),
    })


    const onSubmit = async (values) => {
        try {
            const res = await api.post(`auth/forgot-password`, {
                    email: values.email,
            })
            setIsSuccessful({
                status: true,
            })
            
        } catch (error) {
            const message = error.response.data.message[0].messages[0].message
            setIsSuccessful({
                status: false,
                message: message
            })
        }

    }
    return (
        <Box>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Enter your email address</Typography>
            </Box>

            <Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                {({values, errors, touched, getFieldProps, setFieldValue, isSubmitting}) => (
                    <Form noValidate autoComplete="off">
                        <TextField 
                            name="email" 
                            id="email" 
                            label="Email Address"
                            { ...getFieldProps('email')}
                            variant="outlined"
                            style={{ width: '100%' }}
                            error={errors.email && touched.email ? true : false}
                            helperText={ errors.email && touched.email ?
                                errors.email : null
                            }
                        />
                        <Box textAlign='right' marginTop='1rem' marginBottom='.5rem'>
                            <FormControl className={classes.formControl}>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                >
                                    Send Password Reset Email
                                </Button>
                            </FormControl>
                        </Box>
                        
                        <FormControl className={classes.formControl}>
                            <Box>
                                <FormHelperText 
                                        style={{ textAlign: 'center' }} 
                                        error={isSuccessful?.status === false ? true : false}
                                    >
                                        {
                                            isSuccessful?.status === false ? 
                                                isSuccessful.message ? 
                                                    isSuccessful.message
                                                : 'an error occured' 
                                            : null
                                        }
                                    </FormHelperText>
                                    <FormHelperText 
                                        style={{ textAlign: 'center' }} 
                                        error={isSuccessful?.status === false ? true : false}
                                    >
                                        {
                                            isSuccessful?.status === true ? 
                                                'Email Sent! Kindly check your email to reset your password'
                                            : null
                                        }
                                    </FormHelperText>
                            </Box>
                        </FormControl>
                    </Form>
                )}
                </Formik>         
                                
            </Box>

        </Box>
    )
}

ForgotPasswordForm.propTypes = {

}

export default ForgotPasswordForm
