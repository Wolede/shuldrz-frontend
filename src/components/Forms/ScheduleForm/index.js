import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import api from 'services/Api'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Select, MenuItem, InputLabel, RadioGroup, Radio, TextField, Checkbox, Typography, Box, Grid } from '@material-ui/core'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DateTimePicker } from '@material-ui/pickers';
import {Autocomplete} from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import useSWR from 'swr'
import useAuth from 'contexts/Auth'

import { useTheme } from '@material-ui/styles';
import Button from 'components/Button'
import { useStyles } from './style'
import {getProfileCompletion} from 'helpers';

// how to handle intance whre the same user is trying to schedule the same buddie after scheduling before
// sugges - fetch the buddies upcoming sessions and check if the user has a session there
// - if yes. populate the datetime form with the info and when changed, take the session id and do a put
// - if no just do a post

//  how to handle instance where different users are scheduling the same buddie for the same time
// - sugges - fetch the buddies upcoming sessions and check whn the user has sessions and make those periods unselectable on the form

const ScheduleForm = ({ onClose, formProps: { volunteer } }) => {
    // console.log(user, 'in profile');
    const classes = useStyles()
    const theme = useTheme();
    const { user, loading } = useAuth();

    const [isSuccessful, setIsSuccessful] = useState() 

    // const { data, error, isValidating } = useSWR(loading ? false : `/upcoming-sessions?user.id=${volunteer?.id}`, api.get, {revalidateOnFocus: false})

    const validationSchema = Yup.object({
        dateTime: Yup.date().nullable(),
    })

    const onSubmit = async (values) => {

        values = {
            datetime: values.SessionTime,
            user: user?.id,
            sessionUser: volunteer?.id
        }

        console.log('v', values)

        try {
            const res = await api.post(`upcoming-sessions`, values)
            onClose()
            // console.log('letsee', res, profileCompletion);
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

    // console.log('session', data)

    const fetchedValues = {
        
        SessionTime: new Date(),
        // DateOfBirth: DateOfBirth ? new Date(DateOfBirth) : new Date('1995-08-18T21:11:54'),
        
    }

    // console.log('form', formOptions, fetchedValues)

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
                            <Typography variant="h4" style={{ fontWeight: 600, marginBottom: '.5rem' }}>
                                Set A Session Time
                            </Typography>

                            <Typography variant="body1" style={{ marginBottom: '1rem' }}>
                                Set a date and time for your session with this buddy.
                            </Typography>

                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker
                                    disablePast
                                    // disableToolbar
                                    // variant="inline"
                                    inputVariant="outlined"
                                    // format="DD/MM/YYYY"
                                    margin="normal"
                                    id="SessionTime"
                                    label="Session Time"
                                    value={values.SessionTime}
                                    onChange={value => setFieldValue("SessionTime", value.toDate())}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            
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
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>

        </>
    )
}

ScheduleForm.propTypes = {
    user: PropTypes.object
}

export default ScheduleForm