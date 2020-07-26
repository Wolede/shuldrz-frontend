import { useState } from 'react'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormHelperText, InputAdornment, IconButton, TextField, Box, Typography } from '@material-ui/core'
import Button from 'components/Button'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useStyles } from './style'
import Cookies from 'js-cookie'
import useAuth from 'contexts/Auth'
import api from 'services/Api'
const firebase = require("firebase");
import Modal from 'components/Modal'

const LoginForm = () => {
    const classes = useStyles()
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
            const message = error.response.data.message[0].messages[0].message
            // console.log('error')
            setIsSuccessful({
                status: false,
                message: message === 'Identifier or password invalid.' ? 'Invalid Email or Password. Please Try Again!' : message
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

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
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

                    <FormControl className={classes.formControl}>
                        <TextField 
                        name="email" 
                        id="email" 
                        label="Email Address"
                        { ...getFieldProps('email')}
                        variant="outlined"
                        error={errors.email && touched.email ? true : false}
                        helperText={ errors.email && touched.email ?
                            errors.email : null
                        }
                        />
                    </FormControl>
                    
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
                    <Box>
                        <Typography onClick={handleOpen}>Forgot Password?</Typography>
                    </Box>
                    <FormControl className={classes.formControl}>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        >
                            Login
                        </Button>
                    </FormControl>
                    
                    <FormControl className={classes.formControl}>
                        <FormHelperText 
                            style={{ textAlign: 'center' }} 
                            error={true}
                        >
                            {
                                isSuccessful?.status === false ? 
                                    isSuccessful.message ? 
                                        isSuccessful.message
                                    : 'an error occured' 
                                : null
                            }
                        </FormHelperText>
                    </FormControl>
                    
                </Form>
            )}
            </Formik>

            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal handleClose={handleClose} openModal={openModal} view='forgotPassword' />
                )
            }
        </div>
    )
}

export default LoginForm
