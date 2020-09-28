import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import api from 'services/Api'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormHelperText, TextField, Checkbox, Typography, Box, Chip } from '@material-ui/core'
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
        topics: Yup.array().required('Interested topics is empty'),
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

                            <Box display="flex" marginBottom=".5rem">
                                <Typography variant="h4" style={{ fontWeight: 600, flexGrow: 1 }}>
                                    Quick One
                                </Typography>
                                <FormControl className={classes.formControl}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        type="submit"
                                        size="small"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    >
                                        Continue
                                    </Button>
                                </FormControl>
                            </Box>

                            <p>
                                Tell us the topics you need help with. This will help us better match you with humans.
                                {/* Tell us the topics you need help with. This will help us better match you with {user?.userType === 'Volunteer' ? 'buds' : 'buddies'}. */}
                            </p>
                            
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
                                    onChange={(event, newValue) => {
                                        // console.log('eve', event.currentTarget.getAttribute('data-option-index'), event.currentTarget.getAttribute('aria-selected'), newValue, event.currentTarget)
                                        if (event.currentTarget.getAttribute('data-option-index') == '0' && event.currentTarget.getAttribute('aria-selected') == 'false') {
                                            const x = topics
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
                                            const y = values.topics.filter(top => top !== 'All' && top !== topics.map(topic => topic.name).find((top, idx) => idx == event.currentTarget.getAttribute('data-option-index')))
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
                                    renderInput={(params) => (
                                        <TextField 
                                            {...params} 
                                            name="topics" 
                                            variant="outlined" 
                                            label="Topics" 
                                            placeholder="Interested Topics"
                                            error={errors.topics && touched.topics ? true : false}
                                            helperText={ errors.topics && touched.topics ?
                                                errors.topics : null
                                            }
                                       />
                                    )}
                                />
                            </div>
                        </Box>

                        <Box display='flex' justifyContent='flex-end'>
                            {/* <FormControl className={classes.formControl}>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                >
                                    Save
                                </Button>
                            </FormControl> */}
                            
                            {/* <FormControl className={classes.formControl}>
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
                            </FormControl> */}
                        </Box>

                    </Form>
            )}
            </Formik>
            </Box>

        </>
    )
}

export default AddTopicsForm