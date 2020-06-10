import { useContext } from 'react'
import Router from 'next/router'
import axios from "axios"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button, FormControl, FormHelperText, InputAdornment, IconButton, TextField, Box } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { AuthContext } from 'contexts/AuthContext'
import nookies from 'nookies'

const LoginForm = () => {
    const { auth, dispatchAuth } = useContext(AuthContext)

    const initialValues = {
        email: '',
        password: '',
    }
    
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format!').required('Email is empty!'),
        password: Yup.string().required('Password is empty')
    })

    const onSubmit = async (values) => {
        const { API_URL } = process.env

        try {
            const res = await axios.post(`${API_URL}/auth/local`, {
                identifier: values.email,
                password: values.password
            })
            console.log(res.data);
            
            const token = res.data.jwt
            const user = res.data.user

            nookies.set('', 'token', token, { 
                maxAge: 30 * 24 * 60 * 60, 
                path: '/' 
            })

            dispatchAuth({type: 'UPDATE_AUTH', auth: {
                isAuthenticated : true,
                token: token,
                isSuccessful: true,
                user: user
            }})

            Router.push('/user-home')
        } catch (error) {
            //error state Login Unsuccessful 
            dispatchAuth({type: 'ERROR_AUTH'})
            console.log(error, 'error')
            // console.log(error.response.data.data[0].messages[0].message, 'error')
        }
    }

    const [showPassword, setShowPassword] = React.useState(false)

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
                        {/* <FormHelperText error={true}>{auth.isSuccessful === false ? 'Invalid Email or Password. Please Try Again!' : null}</FormHelperText> */}
                    </FormControl>
                    </Box>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default LoginForm
