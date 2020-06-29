import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Select, MenuItem, InputLabel, RadioGroup, Radio, TextField, Typography, Box, Grid } from '@material-ui/core'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useTheme } from '@material-ui/styles';
import Button from 'components/Button'
import { useStyles } from './style'

const ProfileForm = ({ user }) => {
    // console.log(user, 'in profile');
    const classes = useStyles()
    const theme = useTheme();

    const [isSuccessful, setIsSuccessful] = useState()

    // availableDays: null
    // availableTime: "07:00:00.000"
    // blocked: false
    // confirmed: true
    // createdAt: "2020-06-02T21:49:15.638Z"
    // email: "wolede.adeniyi@gmail.com"
    // firstName: "Wolede"
    // gender: "Male"
    // id: "5ed6c95b4a27b30dd0f7adfa"
    // lastName: "Adeniyi"
    // maritalStatus: "Single"
    // occupation: "Product Designer"
    // profileImage: {_id: "5ef8150a1a277900170c42d0", name: "Clothes 01", alternativeText: null, caption: null, hash: "Clothes_01_6912cd768e", …}
    // provider: "local"
    // role: {_id: "5ed44b8ebb80ca4d4036bfb1", name: "Authenticated", description: "Default role given to authenticated user.", type: "authenticated", createdAt: "2020-06-01T00:27:58.433Z", …}
    // topics: []
    // updatedAt: "2020-06-28T03:56:58.433Z"
    // userType: "Guest"
    // username: "wolede"
    // __v: 0
    // _id: "5ed6c95b4a27b30dd0f7adfa"

    const fetchedValues = {
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        dateOfBirth: null,
        gender: '',
        maritalStatus: '',
        personality_type: '',
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is empty'),
        lastName: Yup.string().required('Last name is empty'),
        username: Yup.string().required('Username is empty'),
        phoneNumber: Yup.string(),
        dateOfBirth: Yup.date().nullable(),
        gender: Yup.string(),
        maritalStatus: Yup.string(),
        personality_type: Yup.string(),
    })

    const onSubmit = async (values) => {
        try {

            
        } catch (error) {
            //error state Login Unsuccessful 
            console.log(error, 'error')
            setIsSuccessful(false)
        }

    }

    return (
        <>
            <Box>
                <Formik
                initialValues={fetchedValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                {({values, errors, touched, getFieldProps, setFieldValue, isSubmitting}) => (
                    <Form noValidate autoComplete="off">
                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '1rem' }}>
                                Personal Information
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>
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

                                <TextField 
                                name="phoneNumber" 
                                id="phoneNumber" 
                                label="Phone Number (optional)"
                                { ...getFieldProps('phoneNumber')}
                                variant="outlined"
                                error={errors.phoneNumber && touched.phoneNumber ? true : false}
                                helperText={ errors.phoneNumber && touched.phoneNumber ?
                                    errors.phoneNumber : null
                                }
                                />

                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                    // disableToolbar
                                    variant="inline"
                                    inputVariant="outlined"
                                    format="Do/MMMM/YYYY"
                                    // margin="normal"
                                    id="dateOfBirth"
                                    label="dateOfBirth"
                                    value={values.dateOfBirth}
                                    onChange={value => setFieldValue("dateOfBirth", value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                </MuiPickersUtilsProvider>

                                <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender" { ...getFieldProps('gender')}  className={classes.grouping}>
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                                </FormControl>

                                <FormControl component="fieldset">
                                <FormLabel component="legend">Marital Status</FormLabel>
                                <RadioGroup aria-label="marital Status" name="maritalStatus" { ...getFieldProps('maritalStatus')} className={classes.grouping}>
                                    <FormControlLabel value="Single" control={<Radio />} label="Single" />
                                    <FormControlLabel value="Married" control={<Radio />} label="Married" />
                                    <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
                                </RadioGroup>
                                </FormControl>

                                
                            </div>
                        </Box>
                    

                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Personality Type
                            </Typography>

                            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                                Select your personality type below. We recommend taking the test at <a href="16personalities.com" style={{ color: theme.palette.primary.main }}>16personalities.com</a>
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>

                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="personality_type_label">Personality Type</InputLabel>
                                <Select
                                labelId="personality_type_label"
                                id="personality_type"
                                { ...getFieldProps('personality_type')}
                                label="Personality Type"
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                </Select>
                            </FormControl>


                            </div>

                        </Box>
                    
                    </Form>
            )}
            </Formik>
            </Box>

        </>
    )
}

ProfileForm.propTypes = {
    user: PropTypes.object
}

export default ProfileForm