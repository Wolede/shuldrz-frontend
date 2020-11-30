import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import api from 'services/Api'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Select, MenuItem, InputLabel, RadioGroup, Radio, TextField, Checkbox, Typography, Box, Chip } from '@material-ui/core'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {Autocomplete} from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';

import { useTheme } from '@material-ui/styles';
import Button from 'components/Button'
import { useStyles } from './style'
import {getProfileCompletion} from 'helpers';
const firebase = require("firebase/app");
import { Users } from 'react-feather'
import useAuth from 'contexts/Auth'




const ProfileForm = ({ user }) => {
    // console.log(user, 'in profile');
    const classes = useStyles()
    const theme = useTheme();
    const { setUser } = useAuth();

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [isSuccessful, setIsSuccessful] = useState()

    const { id, firstName, lastName, username, phoneNumber, DateOfBirth, gender, maritalStatus, personality_type, occupation, reference, experience, availableDays, availableTime, charity, topics, userType } = user
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

            // console.log(user);
            

        } catch (error) {
            setFormOptions(null)
        }
    } 


    useEffect(() => {
        user ? getFormOptions() : false
    }, [])

    //useEffect for removing button message after 4 seconds
    useEffect(() => {
        setTimeout(() => {
            setIsSuccessful(null);
        }, 4000);
    }, [isSuccessful?.status])

    
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
        charity: charity ? charity.id : null,
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
        personality_type: Yup.string().required('Pick a personality type'),
        occupation: Yup.string().max(20, 'Maximum of 20 characters'),
        reference: Yup.string().max(50, 'Maximum of 50 characters'),
        experience: Yup.string().max(74, 'Maximum of 74 characters').required("Come on! I'm sure you can think of something"),
        availableDays: Yup.array(),
        availableTime: Yup.string(),
        charity: Yup.string().nullable(),
        topics: Yup.array().required('Interested topics is empty'),
    })



    // console.log('FETCHED USERNAME', user.username)

    /**Update username in firebase on update */
    const updateFirebaseData = async (newUsername) => {
        const snapshot = await firebase.firestore().collection('chats').where('users', 'array-contains', user.username).get()
        // console.log('USER', user.username)
        // console.log('USER', user.id)
        // console.log('NEW USERNAME', newUsername)

        snapshot.forEach(doc => {         
            const selectedUser = doc.data().users.filter(_user => _user !== user.id)[0]
            const users = [newUsername, selectedUser]
            doc.ref.update({
                    users: [...users]
                })        
            
        })

        let ref = firebase.firestore().collection('users').doc(user.id);
        ref.update({
            username: newUsername
        })       
        .catch(function(error) {
            console.error(error);
        });
    }

    const onSubmit = async (values) => {
        let res;
        const newTopics = values?.topics.reduce((acc, curr) => {

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
            
            res = await api.put(`users/${id}`, values)
            
            if(res){
                updateFirebaseData(res.data.username) 
            }
            
            
            const profileCompletion = getProfileCompletion(res.data)
            if (profileCompletion === '100%' && !res.data.isProfileCompleted) {
                //update the hearts count
                if (res.data.heart) {
                    res = await api.put(`/hearts/${res.data.heart.id}`, { user: res.data.id, count: 20 })
                } else {
                    res = await api.post(`/hearts`, { user: res.data.id, count: 20 })
                }
                //update the isProfileCompleted property
                values.isProfileCompleted = true;
                res = await api.put(`users/${id}`, values)               
            }
            // console.log('letsee', res, profileCompletion);
            //set global user
            setUser(res.data)
            
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

    // console.log('form', formOptions, fetchedValues)
    // const [isAllSelected, setIsAllSelected] = useState(false);
    // let isAllSelected;

    return (
        <>
            <Box>
                <Formik
                initialValues={fetchedValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                {({values, errors, touched, getFieldProps, setFieldValue, isSubmitting, isValid}) => (
                    <Form noValidate autoComplete="off">
                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '1rem' }}>
                                Personal Information
                            </Typography>
                            {/* {console.log(values)} */}
                            {/* {console.log(isValid)} */}
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
                                type="tel"
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
                                    format="MM/DD/YYYY"
                                    margin="normal"
                                    id="DateOfBirth"
                                    label="DateOfBirth"
                                    value={values?.DateOfBirth}
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
                                disabled={!formOptions}
                                >
                                {formOptions?.personalities?.map((value, key) => (
                                    <MenuItem key={key} value={value.id}>{value.name} - {value.personalityType}</MenuItem>
                                ))}
                                </Select>
                                <FormHelperText error={errors.personality_type && touched.personality_type ? true : false}>
                                    {!formOptions && <>Loading...</>}
                                    
                                    { errors.personality_type && touched.personality_type ?
                                        errors.personality_type : null
                                    }
                                </FormHelperText>
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
                                    value={values?.availableDays}
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
                                    <MenuItem value={'All Day'}>All Day</MenuItem>
                                    <MenuItem value={'Mornings'}>Mornings</MenuItem>
                                    <MenuItem value={'Afternoons'}>Afternoons</MenuItem>
                                    <MenuItem value={'Evenings'}>Evenings</MenuItem>
                                    </Select>
                                </FormControl>


                            </div>
                        </Box>


                        {userType === 'Volunteer' && (
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
                                        disabled={!formOptions}
                                        >                                               
                                        {formOptions?.charities?.map((value, key) => (
                                            <MenuItem key={key} value={value.id}>{value.name}</MenuItem>
                                        ))}
                                        </Select>
                                        <FormHelperText error={errors.charity && touched.charity ? true : false}>
                                            {!formOptions && <>Loading...</>}
                                            
                                            { errors.charity && touched.charity ?
                                                errors.charity : null
                                            }
                                        </FormHelperText>
                                    </FormControl>

                                </div>
                            </Box>
                        )}


                        <Box>
                            <Typography variant="body2" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Interested Topics (Needs)
                            </Typography>

                            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                            These are the topics we'd use to match you with {userType === 'Volunteer' ? 'buds' : 'buddies'}
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
                                    onChange={(event, newValue) => {
                                        // console.log('eve', event.currentTarget.getAttribute('data-option-index'), event.currentTarget.getAttribute('aria-selected'), newValue, event.currentTarget)
                                        if (event.currentTarget.getAttribute('data-option-index') == '0' && event.currentTarget.getAttribute('aria-selected') == 'false') {
                                            const x = formOptions
                                                .topics
                                                .map(topic => topic.name)
                                                .reduce((acc, curr) => {
                                                    const topicInAcc = acc.find(top => top === curr)
                                                    if (!topicInAcc) {
                                                        acc.push(curr)
                                                    }
                                                    return acc
                                                }, [...values.topics])
                                                
                                            setFieldValue('topics', x)
                                            // console.log('evexylo', x, values.topics)
                                        } else if (event.currentTarget.getAttribute('data-option-index') == '0' && event.currentTarget.getAttribute('aria-selected') == 'true') {
                                            setFieldValue("topics", newValue)

                                        } else if (event.currentTarget.getAttribute('data-option-index') != '0' && event.currentTarget.getAttribute('aria-selected') == 'true') {
                                            const y = values.topics.filter(top => top !== 'All' && top !== formOptions.topics.map(topic => topic.name).find((top, idx) => idx == event.currentTarget.getAttribute('data-option-index')))
                                            setFieldValue('topics', y)
                                        } else if (event.currentTarget.getAttribute('data-option-index') != '0' && event.currentTarget.getAttribute('aria-selected') == 'false') { 
                                            setFieldValue("topics", newValue)
                                        }
                                        // setFieldValue("topics", newValue)
                                    } }
                                    renderOption={(option, { selected }) => {
                                        // console.log('opt', option, selected, values?.topics)
                                        let isAllSelected = false;

                                        if (option == 'All' && selected) {
                                            isAllSelected = true;
                                        } else if (option == 'All' && !selected) {
                                            isAllSelected = false
                                        } 
                                        else if (option != 'All' && !selected) {
                                            isAllSelected = false
                                        }
                                        // console.log('isAll', isAllSelected)
                                        return (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={isAllSelected ? true : selected}
                                                />
                                                {option}
                                            </React.Fragment>
                                        )
                                    }}
                                    renderTags={(tagValue, getTagProps) =>
                                        tagValue.map((option, index) => {
                                            if (option !== 'All') {
                                                return (
                                                    <Chip
                                                        label={option}
                                                        {...getTagProps({ index })}
                                                        onDelete={() => { 
                                                            // getTagProps({ index }).onDelete(); 
                                                            const x = values.topics.filter(top => top != 'All' && top != option)
                                                            setFieldValue('topics', x)
                                                            // console.log('finally', option, values.topics, x) 
                                                        }}
                                                        // disabled={fixedOptions.indexOf(option) !== -1}
                                                    />
                                                )
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                    closeIcon={
                                        <CloseIcon
                                            onClick={() => setFieldValue('topics', [])}
                                        />
                                    }
                                    // style={{ width: 500 }}
                                    renderInput={(params) => {
                                        // console.log('para', params)
                                        return (
                                            <TextField {...params} 
                                                name="topics" 
                                                variant="outlined" 
                                                label="Topics" 
                                                placeholder="Interested Topics"
                                                error={errors.topics && touched.topics ? true : false}
                                                helperText={ errors.topics && touched.topics ?
                                                    errors.topics : null
                                                }
                                            />
                                        )
                                    }}
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

                                            {
                                                isSuccessful?.status === true ? 
                                                    'Saved!'
                                                : null
                                            }

                                            

                                        </FormHelperText>
                                    <FormHelperText error={errors}>
                                        <p>
                                            {
                                                !isValid ? 'There are some errors in the form' : ''
                                            }
                                        </p>
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