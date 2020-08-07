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
import {getProfileCompletion} from 'helpers';
import useAuth from 'contexts/Auth'

const AddTopicsForm = ({ onClose, getSuggestedBuddies }) => {

    const { user, setUser } = useAuth();

    const classes = useStyles()
    const theme = useTheme();
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    const [isSuccessful, setIsSuccessful] = useState()
    const [topics, setTopics] = useState([]);
    // i need charity, personality type, topics, 
    const getFormOptions = async () => {
        try {
            const resTopics = await api.get('/topics')
            
            setTopics(resTopics.data);            

        } catch (error) {
            setTopics(null)
        }
    } 


    useEffect(() => {
        user ? getFormOptions() : null;
    }, [user])


    // console.log(user);
    // console.log(formOptions?.topics);
    
    const fetchedValues = {
        topics: [],
    }

    const validationSchema = Yup.object({
        topics: Yup.array(),
    })

    const onSubmit = async (values) => {

        const newTopics = values.topics.reduce((acc, curr) => {
            const topicObject = topics.find(top => top.name === curr);
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
            let res;
            res = await api.put(`users/${user.id}`, values)

            // const profileCompletion = getProfileCompletion(res.data)

            // if (profileCompletion === '100%' && !res.data.isProfileCompleted) {
            //     //update the hearts count
            //     if (res.data.heart) {
            //         res = await api.put(`/hearts/${res.data.heart.id}`, { user: res.data.id, count: 20 })
            //     } else {
            //         res = await api.post(`/hearts`, { user: res.data.id, count: 20 })
            //     }
            //     //update the isProfileCompleted property
            //     values.isProfileCompleted = true;
            //     res = await api.put(`users/${id}`, values)
            // }

            const topicIds = values.topics.map((topic) => topic._id)

            getSuggestedBuddies(topicIds)
            
            console.log('focus here', topicIds)
            
            // console.log('letsee', res, profileCompletion);

            // set global user
            setUser(res.data)
            onClose()

            setIsSuccessful({
                status: true,
            })
        } catch (error) {
            const message = error.response.data.message[0].messages[0].message

            onClose()
            // console.log('error')
            setIsSuccessful({
                status: false,
                message: message
            })
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
                            <Typography variant="h4" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Quick One
                            </Typography>

                            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                                Tell us the topics you need help with. This will help us better match you with {user?.userType === 'Volunteer' ? 'buds' : 'buddies'}.
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>
                                <Autocomplete
                                    multiple
                                    id="topics"
                                    options={
                                        topics ? topics.map(topic => topic.name) : [] 
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

                        <Box display='flex' justifyContent='flex-end'>
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

export default AddTopicsForm