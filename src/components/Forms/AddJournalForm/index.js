import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Box, Typography, TextField, FormControlLabel, Switch, FormControl, FormHelperText } from '@material-ui/core'
import Button from 'components/Button'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import { trigger } from 'swr'
import api from 'services/Api'
// import { JournalContext } from 'contexts/JournalContext'

const AddJournalForm = props => {
    const classes = useStyles()
    const { user } = useAuth();
    const [isSuccessful, setIsSuccessful] = useState()
    const { prevJournal } = props
    // const [ journal ] = useContext(JournalContext)
    const initialValues = {
        snippetNote: prevJournal ? prevJournal.notes : '',
        isVisible: prevJournal ? prevJournal.isVisible : true
    }
    const validationSchema = Yup.object({
        snippetNote: Yup.string().max(1000, "You've hit the 1000 character limit. Add another entry").required('Come on! Get it off your chest'),
        isVisible: Yup.bool()
    })



    const onSubmit = async (values) => {

        const req = prevJournal ? api.put(`journals/${prevJournal.id}`, {
            notes: values.snippetNote,
            isVisible: values.isVisible,
            user: user.id
        }) : api.post(`journals`, {
            notes: values.snippetNote,
            isVisible: values.isVisible,
            user: user.id
        })

        try {
            const res = await req
            
            // console.log('let see', res);
            trigger(`/journey?_start=0&_limit=${props.pageLimit}&user.id=${user?.id}&userType=${user?.userType}&_sort=createdAt:desc`, api.get)
            props.onClose()
            
        } catch (error) {
            // console.log(error, 'error')
            setIsSuccessful(false)
        }

    }
    return (
        <Box>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Add Journal Entry</Typography>
                <Typography variant="caption" gutterBottom>You can choose to make this public on your profile</Typography>
            </Box>

            <Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                >
                {({values, errors, touched, getFieldProps, setFieldValue, isSubmitting}) => (
                    <Form noValidate autoComplete="off">
                        {/* {console.log(values) } */}
                                <TextField 
                                    name="snippetNote" 
                                    id="snippetNote" 
                                    label="..What's on your mind today?"
                                    { ...getFieldProps('snippetNote')}
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    style={{ width: '100%' }}
                                    // error={errors.snippetNote && touched.snippetNote ? true : false}
                                    helperText={ errors.snippetNote && touched.snippetNote ?
                                        errors.snippetNote : null
                                    }
                                />

                            <FormControlLabel
                                control={<Switch { ...getFieldProps('isVisible')} name="isVisible" color="primary" />}
                                label="Public?"
                            />
                            <Box marginTop='1.5rem' display='flex' justifyContent='flex-end'>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                >
                                    Save
                                </Button>
                            </Box>
                            <FormControl className={classes.formControl}>
                                <FormHelperText style={{ textAlign: 'center' }} error={true}>{isSuccessful === false ? 'an error occured' : null}</FormHelperText>
                            </FormControl>
                    </Form>
                )}
                </Formik>         
                                
            </Box>

        </Box>
    )
}

AddJournalForm.propTypes = {

}

export default AddJournalForm
