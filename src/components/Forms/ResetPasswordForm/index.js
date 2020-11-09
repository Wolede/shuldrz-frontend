import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Box, Typography, TextField, InputAdornment, IconButton, FormControl, FormHelperText } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Button from 'components/Button'
import Link from 'next/link'
import Paper from 'components/Paper'
import { useStyles } from './style'
import api from 'services/Api'

const ResetPasswordForm = () => {
    const router = useRouter()
    const classes = useStyles()
    const [isSuccessful, setIsSuccessful] = useState()

    // console.log(router.query.code);
    const initialValues = {
        code: router.query?.code,
        password: '',
        passwordConfirmation: '',
    }
    const validationSchema = Yup.object({
        password: Yup.string().required('Password is empty').matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9 !"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{6,}$/, 'Minimum of 6 characters and at least one lowercase letter, one uppercase letter, one number and one special character'),
        passwordConfirmation: Yup.string().required('Confirmation Password is Empty')

    })


    const onSubmit = async (values) => {
        // console.log(initialValues.code, 'code')
        try {
            const res = await api.post(`auth/reset-password`, {
                    code: initialValues.code,
                    password: values.password,
                    passwordConfirmation: values.passwordConfirmation
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

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth='sm' >
            <Box marginTop='8rem'>
                <Paper padding='1.5rem'>
                    <Box>
                    <Box marginBottom='1.5rem'>
                        <Typography variant="h4" gutterBottom>Reset Your Password</Typography>
                        <Typography variant="caption" gutterBottom>Type in your new password</Typography>
                    </Box>

                    <Box>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        >
                        {({values, errors, touched, getFieldProps, setFieldValue, isSubmitting}) => (
                            <Form noValidate autoComplete="off">
                                {/* {console.log(values)} */}
                                <FormControl className={classes.formControl}>
                                    <TextField 
                                    name="password" 
                                    id="password" 
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    { ...getFieldProps('password')}
                                    variant="outlined"
                                    error={errors.password && touched.password ? true : false}
                                    helperText={ errors.password && touched.password ?
                                        errors.password : null
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    />
                                </FormControl>


                                <FormControl className={classes.formControl}>
                                    <TextField 
                                    name="passwordConfirmation" 
                                    id="passwordConfirmation" 
                                    type={showPassword ? 'text' : 'password'}
                                    label="Confirm Password"
                                    { ...getFieldProps('passwordConfirmation')}
                                    variant="outlined"
                                    error={errors.passwordConfirmation && touched.passwordConfirmation ? true : false}
                                    helperText={ errors.passwordConfirmation && touched.passwordConfirmation ?
                                        errors.passwordConfirmation : null
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    />
                                </FormControl>


                                <Box textAlign='right' marginTop='1rem' marginBottom='.5rem'>
                                    <FormControl className={classes.formControl}>
                                        <Button 
                                        variant="contained" 
                                        color="primary" 
                                        type="submit"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                        >
                                            Reset Password
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
                                                        'Your password has been reset!'
                                                    : null
                                                }
                                            </FormHelperText>
                                    </Box>
                                </FormControl>
                                {
                                    isSuccessful?.status === true && (
                                        <Link href="/login">
                                            <a style={{textDecoration:'none'}}>
                                                <FormControl className={classes.formControl}>
                                                    <Button variant="contained" color="secondary">
                                                        Login with new password
                                                    </Button>
                                                </FormControl>
                                            </a>
                                        </Link>
                                    )
                                }
                            </Form>
                        )}
                        </Formik>         
                                        
                    </Box>

                </Box>
                </Paper>
            </Box>
        </Container>
    )
}

export default ResetPasswordForm
