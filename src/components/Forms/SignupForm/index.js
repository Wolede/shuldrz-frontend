import { useState } from 'react'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormHelperText, InputAdornment, IconButton, TextField } from '@material-ui/core'
import { useStyles } from './style'
import Button from 'components/Button'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Cookies from 'js-cookie'
import useAuth from 'contexts/Auth'
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
        firstName: Yup.string().required('First name is empty'),
        lastName: Yup.string().required('Last name is empty'),
        username: Yup.string().required('Username is empty'),
        // occupation: Yup.string().required('Occupation is empty'),
        email: Yup.string().email('Invalid email format!').required('Email is empty!'),
        password: Yup.string().required('Password is empty')
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
                    profileImage: null
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
                        <FormHelperText style={{ textAlign: 'center' }} error={true}>{isSuccessful === false ? 'Invalid Email or Password. Please Try Again!' : null}</FormHelperText>
                    </FormControl>

                </Form>
            )}
            </Formik>
        </div>
    )
}

export default SignupForm
