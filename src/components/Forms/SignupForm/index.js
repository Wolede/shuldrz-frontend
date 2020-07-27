import { useState } from 'react'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormHelperText, InputAdornment, IconButton, TextField, Box, Typography, Hidden } from '@material-ui/core'
import { useStyles } from './style'
import Button from 'components/Button'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Cookies from 'js-cookie'
import useAuth from 'contexts/Auth'
import Link from 'next/link'
import api from 'services/Api'

const firebase = require("firebase");

const SignupForm = ({volunteer}) => {
    const classes = useStyles()
    const { setUser } = useAuth()
    const [isSuccessful, setIsSuccessful] = useState()

    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        // occupation: '',
        email: '',
        password: '',
        userType: volunteer ? 'Volunteer' : 'Guest', // assigning user type
    }
    
    const validationSchema = Yup.object({
        firstName: Yup.string().max(20, 'Maximum of 20 characters').required('First name is empty'),
        lastName: Yup.string().max(20, 'Maximum of 20 characters').required('Last name is empty'),
        username: Yup.string().min(4, "Can't be less than 4 characters").max(12, 'Maximum of 12 characters').required('Username is empty'),
        // occupation: Yup.string().required('Occupation is empty'),
        email: Yup.string().email('Invalid email format!').required('Email is empty!'),
        password: Yup.string().required('Password is empty').matches(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])[a-zA-Z0-9 !"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]{6,}$/, 'Minimum of 6 characters and at least one lowercase letter, one uppercase letter, one number and one special character')
    })

    const onSubmit = async (values) => {
        try {
            const res = await api.post(`auth/local/register`, {
                firstName: values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1), //Capitalize first letter
                lastName: values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1),
                username: values.username,
                // occupation: values.occupation,
                email: values.email,
                password: values.password,
                userType: values.userType
            })
            
            const token = res.data.jwt

            if(token) {
                console.log('got token');
                Cookies.set('token', token, { expires: 60 })
                api.defaults.headers.Authorization = `Bearer ${token}`
                const res = await api.get('users/me')
                const user = res.data
                const userObj = {
                    username: user.username,
                    id: user.id,
                    profileImage: user.profileImage?.url
                };
                // sendUserDataToFirestore(user)
                            
                firebase.firestore().collection('users').doc(user.username).set(userObj)
                .then(() => {
                    console.log('logged user')
                }, err => {
                    console.log('user not stored:' + err)
                }
                    
                )
                
                setUser(user)
                console.log("Got user", user)
                Router.push('/app')
            }
        } catch (error) {
            const message = error.response.data.message[0].messages[0].message
            // console.log('error')
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
        <div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {({errors, touched, getFieldProps, isSubmitting}) => (
                <Form noValidate autoComplete="off">

                    <FormControl className={classes.formControl}>
                        <TextField 
                        name="firstName" 
                        id="firstName" 
                        label="First Name"
                        { ...getFieldProps('firstName')}
                        variant="outlined"
                        error={errors.firstName && touched.firstName ? true : false}
                        helperText={ errors.firstName && touched.firstName ?
                            errors.firstName : null
                        }
                        />
                    </FormControl>
                    
                    <FormControl className={classes.formControl}>
                        <TextField 
                        name="lastName" 
                        id="lastName" 
                        label="Last Name"
                        { ...getFieldProps('lastName')}
                        variant="outlined"
                        error={errors.lastName && touched.lastName ? true : false}
                        helperText={ errors.lastName && touched.lastName ?
                            errors.lastName : null
                        }
                        />
                    </FormControl>
                    
                    <FormControl className={classes.formControl}>
                        <TextField 
                        name="username" 
                        id="username" 
                        label="Username"
                        { ...getFieldProps('username')}
                        variant="outlined"
                        error={errors.username && touched.username ? true : false}
                        helperText={ errors.username && touched.username ?
                            errors.username : null
                        }
                        />
                    </FormControl>
                    
                    {/* <FormControl className={classes.formControl}>
                        <TextField 
                        name="occupation" 
                        id="occupation" 
                        label="Occupation"
                        { ...getFieldProps('occupation')}
                        variant="outlined"
                        error={errors.occupation ? true : false}
                        helperText={ errors.occupation && touched.occupation ?
                            errors.occupation : null
                        }
                        />
                    </FormControl> */}
                    
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
                    
                    <FormControl className={classes.formControl}>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        >
                            Signup
                        </Button>
                    </FormControl>
                    
                    <FormControl>
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


                    <Hidden mdUp>
                        <Box marginTop='4rem'>
                            <Typography variant='body2'>
                                Already have an account? <Link href="login"><a className={classes.link}>Login</a></Link>
                            </Typography>
                        </Box>
                    </Hidden>


                </Form>
            )}
            </Formik>
        </div>
    )
}

export default SignupForm
