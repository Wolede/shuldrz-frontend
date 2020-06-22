import { useState } from 'react'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button, FormControl, FormHelperText, InputAdornment, IconButton, TextField, Box } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Cookies from 'js-cookie'
import useAuth from 'contexts/Auth'
import api from 'services/Api'
const firebase = require("firebase");

const LoginForm = () => {
    const { setUser } = useAuth()
    const [isSuccessful, setIsSuccessful] = useState()
    
    const initialValues = {
        email: '',
        password: '',
    }
    
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format!').required('Email is empty!'),
        password: Yup.string().required('Password is empty')
    })

    const onSubmit = async (values) => {
        try {

            const res = await api.post('auth/local', {
                identifier: values.email,
                password: values.password
            })
            const token = res.data.jwt
            
            if(token) {
                console.log('got token');
                Cookies.set('token', token, { expires: 60 })
                api.defaults.headers.Authorization = `Bearer ${token}`
                const res = await api.get('users/me')
                const user = res.data
                setUser(user)
                console.log("Got user", user)
                Router.push('/app')
            }
        } catch (error) {
            //error state Login Unsuccessful 
            console.log(error, 'error')
            setIsSuccessful(false)
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
        <div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {({values, errors, touched, getFieldProps, isSubmitting}) => (
                <Form noValidate autoComplete="off">
                    <Box marginBottom={2}>
                    <FormControl>
                        <TextField 
                        name="email" 
                        id="email" 
                        label="Email Address"
                        { ...getFieldProps('email')}
                        variant="outlined"
                        error={errors.email ? true : false}
                        helperText={ errors.email && touched.email ?
                            errors.email : null
                        }
                        />
                    </FormControl>
                    </Box>
                    <Box marginBottom={2}>
                    <FormControl>
                        <TextField 
                        name="password" 
                        id="password" 
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        { ...getFieldProps('password')}
                        variant="outlined"
                        error={errors.password ? true : false}
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
                    </Box>
                    <Box marginBottom={2}>
                    <FormControl>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        disabled={isSubmitting}
                        >
                            Login
                        </Button>
                    </FormControl>
                    </Box>
                    <Box marginBottom={2}>
                    <FormControl>
                        <FormHelperText error={true}>{isSuccessful === false ? 'Invalid Email or Password. Please Try Again!' : null}</FormHelperText>
                    </FormControl>
                    </Box>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default LoginForm
