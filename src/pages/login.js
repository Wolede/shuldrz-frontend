import Head from 'next/head'
import axios from "axios"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button, FormControl, InputAdornment, IconButton, TextField, Box } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import BackButton from '../components/BackButton';
import Card from '../components/Card'
import Router from 'next/router'
import nookies from 'nookies'
import LoginForm from 'components/Forms/LoginForm'

const Login = () => {

    return (
        <div>
            <Head>
                <title>Shuldrz | Login</title>
            </Head>
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
                        error={false}
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
                </Form>
            )}
            </Formik>
            <BackButton/>        
            <Card/>                  
            <LoginForm />
            
        </div>
    )
}

// export async function getServerSideProps(ctx) {
//     const isAuthenticated = nookies.get(ctx).token
//     // console.log(isAuthenticated, 'cookietoken')
//     if (isAuthenticated) {
//         if (typeof window !== 'undefined') {
//             Router.push("/app")
//         } else {
//             if (ctx.res) {
//                 ctx.res.writeHead(301, {
//                     Location: '/app'
//                 })
//                 ctx.res.end()
//             }
//         }
//         return {props: {isAuthenticated : true}}
//     } else {
//         return {props: {isAuthenticated : false}}
//     }
// }

export default Login
