import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import api from 'services/Api'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Select, MenuItem, InputLabel, RadioGroup, Radio, TextField, Checkbox, Typography, Box, Grid } from '@material-ui/core'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {Autocomplete} from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { useTheme } from '@material-ui/styles';
import Button from 'components/Button'
import { useStyles } from './style'

const ProfileForm = ({ user }) => {
    // console.log(user, 'in profile');
    const classes = useStyles()
    const theme = useTheme();
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [isSuccessful, setIsSuccessful] = useState()

    const { id, firstName, lastName, username, phoneNumber, DateOfBirth, gender, maritalStatus, personality_type, occupation, reference, experience, availableDays, availableTime, charity, topics } = user
    // availableTime: "07:00:00.000"

    // console.log('FOFO', formOptions);
    const [formOptions, setFormOptions] = useState()
    // i need charity, personality type, topics, 
    const getFormOptions = async () => {
        try {
            const resCharities = await api.get('/charities')
            const resPersonality = await api.get('/personality-types')
            const resTopics = await api.get('/topics')
            
            setFormOptions({
                ...formOptions,
                charities: resCharities.data, 
                personalities: resPersonality.data, 
                topics: resTopics.data
            })

            console.log(user);
            

        } catch (error) {
            setFormOptions(null)
        }
    } 


    useEffect(() => {
        user ? getFormOptions() : false
    }, [])


    console.log(topics);
    console.log(formOptions?.topics);
    
    const fetchedValues = {
        firstName: firstName ? firstName : '',
        lastName: lastName ? lastName : '',
        username: username ? username : '',
        phoneNumber: phoneNumber ? phoneNumber : '',
        DateOfBirth: DateOfBirth ? new Date(DateOfBirth) : new Date('1995-08-18T21:11:54'),
        gender: gender ? gender : '',
        maritalStatus: maritalStatus ? maritalStatus : '',
        personality_type: personality_type ? personality_type.id : '',
        occupation: occupation ? occupation : '',
        reference: reference ? reference : '',
        experience: experience ? experience : '',
        availableDays: availableDays ? availableDays : [],
        availableTime: availableTime ? availableTime : '',
        charity: charity ? charity.id : '',
        // topics: topics ? topics.map((option) => option.name) : [],
        topics: topics ? topics.map(topic => topic.name) : [],
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().max(20, 'Maximum of 20 characters').required('First name is empty'),
        lastName: Yup.string().max(20, 'Maximum of 20 characters').required('Last name is empty'),
        username: Yup.string().min(4, "Can't be less than 4 characters").max(12, 'Maximum of 12 characters').required('Username is empty'),
        phoneNumber: Yup.string().max(15, 'too long...'),
        DateOfBirth: Yup.date().nullable(),
        gender: Yup.string(),
        maritalStatus: Yup.string(),
        personality_type: Yup.string(),
        occupation: Yup.string().max(20, 'Maximum of 20 characters'),
        reference: Yup.string().max(50, 'Maximum of 50 characters'),
        experience: Yup.string().max(50, 'Maximum of 50 characters'),
        availableDays: Yup.array(),
        availableTime: Yup.string(),
        charity: Yup.string(),
        topics: Yup.array(),
    })

    const onSubmit = async (values) => {

        const newTopics = values.topics.reduce((acc, curr) => {
            const topicObject = formOptions.topics.find(top => top.name === curr);
            if (topicObject) {
                acc.push(topicObject);
            }
            return acc; 
        }, [])

        values = {
            ...values,
            topics: newTopics
        }

        try {
            const res = await api.put(`users/${id}`, values)
            
            // console.log('letsee', res);
            setIsSuccessful({
                status: true,
            })
        } catch (error) {
            const message = error.response.data.message[0].messages[0].message
            // console.log('error')
            setIsSuccessful({
                status: false,
                message: message
            })
        }

    }

    console.log('form', formOptions)

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
                            {console.log(values)}
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
                                type="number"
                                className={classes.numberInput}
                                error={errors.phoneNumber && touched.phoneNumber ? true : false}
                                helperText={ errors.phoneNumber && touched.phoneNumber ?
                                    errors.phoneNumber : null
                                }
                                />

                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <KeyboardDatePicker
                                    // disableToolbar
                                    // variant="inline"
                                    inputVariant="outlined"
                                    format="DD/MM/YYYY"
                                    margin="normal"
                                    id="DateOfBirth"
                                    label="DateOfBirth"
                                    value={values.DateOfBirth}
                                    onChange={value => setFieldValue("DateOfBirth", value.toDate())}
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
                                Select your personality type below. We recommend taking the test at <a href="https://16personalities.com" target="_blank" style={{ color: theme.palette.primary.main }}>16personalities.com</a>
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
                                <MenuItem value={null}>A Brick</MenuItem>
                                {formOptions?.personalities?.map((value, key) => (
                                    <MenuItem key={key} value={value.id}>{value.personalityType}</MenuItem>
                                ))}
                                </Select>
                            </FormControl>


                            </div>

                        </Box>

                        
                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Experience
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>
                                <TextField 
                                    name="occupation" 
                                    id="occupation" 
                                    label="Occupation"
                                    { ...getFieldProps('occupation')}
                                    variant="outlined"
                                    error={errors.occupation && touched.occupation ? true : false}
                                    helperText={ errors.occupation && touched.occupation ?
                                        errors.occupation : null
                                    }
                                />

                                <TextField 
                                    name="reference" 
                                    id="reference" 
                                    label="Reference"
                                    { ...getFieldProps('reference')}
                                    variant="outlined"
                                    error={errors.reference && touched.reference ? true : false}
                                    helperText={ errors.reference && touched.reference ?
                                        errors.reference : null
                                    }
                                />

                            </div>
                        </Box>


                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                About
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>

                                <TextField 
                                    name="experience" 
                                    id="experience" 
                                    label="Tell us something unique about you (short description)"
                                    { ...getFieldProps('experience')}
                                    variant="outlined"
                                    placeholder="...I'm a mother to 2 Autistic kids"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    multiline
                                    rows={4}
                                    style={{ width: '100%' }}
                                    error={errors.experience && touched.experience ? true : false}
                                    helperText={ errors.experience && touched.experience ?
                                        errors.experience : null
                                    }
                                />

                            </div>
                        </Box>


                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Availability
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>
                                <Autocomplete
                                    multiple
                                    id="availableDays"
                                    options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    value={values.availableDays}
                                    onChange={(event, newValue) => setFieldValue("availableDays", newValue)}
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                        </React.Fragment>
                                    )}
                                    // style={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField {...params} name="availableDays" variant="outlined" label="Available Days" placeholder="Days of the week"
                                        
                                       />
                                    )}
                                />

                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="availableTimeLabel">Available Time</InputLabel>
                                    <Select
                                    labelId="availableTimeLabel"
                                    id="availableTime"
                                    { ...getFieldProps('availableTime')}
                                    label="Available Time"
                                    >
                                    <MenuItem value={'07:00:00.000'}>7:00</MenuItem>
                                    <MenuItem value={'08:00:00.000'}>8:00</MenuItem>
                                    </Select>
                                </FormControl>


                            </div>
                        </Box>


                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Charity
                            </Typography>
                            
                            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                                Select one of the charities we support. All your volunteer efforts will go to them.
                            </Typography>

                            <div className={classes.fieldWrapper}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="charityLabel">Charity</InputLabel>
                                    <Select
                                    labelId="charityLabel"
                                    id="charity"
                                    { ...getFieldProps('charity')}
                                    label="Charity"
                                    >
                                        <MenuItem value={null}>No Charity</MenuItem>
                                    {formOptions?.charities?.map((value, key) => (
                                        <MenuItem key={key} value={value.id}>{value.name}</MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                            </div>
                        </Box>


                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Interested Topics (Needs)
                            </Typography>

                            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                            These are the topics we'd use to match you with guests.
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>
                                <Autocomplete
                                    multiple
                                    id="topics"
                                    options={
                                        formOptions ? formOptions.topics.map(topic => topic.name) : [] 
                                    }
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    value={values.topics}
                                    onChange={(event, newValue) => {setFieldValue("topics", newValue)} }
                                    renderOption={(option, { selected }) => (
                                        <React.Fragment>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option}
                                        </React.Fragment>
                                    )}
                                    // style={{ width: 500 }}
                                    renderInput={(params) => (
                                        <TextField {...params} name="topics" variant="outlined" label="Topics" placeholder="Interested Topics"
                                        
                                       />
                                    )}
                                />
                            </div>
                        </Box>

                        <Box>
                            <FormControl className={classes.formControl}>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                >
                                    Save
                                </Button>
                            </FormControl>
                            
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
                                                    'Saved!'
                                                : null
                                            }
                                        </FormHelperText>
                                </Box>
                            </FormControl>
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