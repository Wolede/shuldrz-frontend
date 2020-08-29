import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from 'services/Api'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormHelperText, TextField, Checkbox, Typography, Box, Chip } from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';
import Button from 'components/Button'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'



const AddSessionsForm = ({onClose}) => {
    const { user } = useAuth();
    const classes = useStyles()

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;


    const [isSuccessful, setIsSuccessful] = useState()
    const [topics, setTopics] = useState([]);

    const fetchedValues = {
        topics: [],
    }

    const validationSchema = Yup.object({
        topics: Yup.array().required('Interested topics is empty'),
    })

    const onSubmit = async (values) => {

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
                                New Session
                            </Typography>
                            
                            <div className={classes.fieldWrapper}>
                                
                            </div>
                        </Box>

                        <Box display='flex' justifyContent='flex-end'>
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

AddSessionsForm.propTypes = {

}

export default AddSessionsForm
