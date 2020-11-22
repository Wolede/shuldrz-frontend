import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Box, Typography, TextField, FormControl, FormHelperText } from '@material-ui/core'
import Button from 'components/Button'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import { trigger } from 'swr'
import api from 'services/Api'

const NoteCommentForm = (props) => {
    const classes = useStyles()
    const { user } = useAuth();
    const [isSuccessful, setIsSuccessful] = useState()

    const {noteId, triggerUrl, prevComment} = props

    const initialValues = {
        comment: '',
    }

    const validationSchema = Yup.object({
        comment: Yup.string().max(1000, "You've hit the 1000 character limit. Add another comment after").required('Come on! Get it off your chest'),
    })

    const onSubmit = async (values) => {

        const req = prevComment ? api.put(`note-comments/${noteId}`, {
            comment: values.comment,
        }) : api.post(`note-comments`, {
            comment: values.comment,
            user: user.id,
            wall_note: noteId
        })

        try {
            const res = await req
            
            // console.log('let see', res);
            trigger(triggerUrl, api.get)
            values.comment = ''
        } catch (error) {
            // console.log(error, 'error')
            setIsSuccessful(false)
        }

    }

    return (
        <Box>
            <Box marginBottom='1rem'>
                <Typography variant="h6" gutterBottom>Add New Comment</Typography>
            </Box>
            <Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    >
                    {({values, errors, touched, getFieldProps, setFieldValue, isSubmitting}) => (
                        <Form noValidate autoComplete="off">

                            <FormControl className={classes.formControl}>
                                <TextField 
                                    name="comment" 
                                    id="comment" 
                                    label="Write something sweet..."
                                    { ...getFieldProps('comment')}
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    // error={errors.comment && touched.comment ? true : false}
                                    helperText={ errors.comment && touched.comment ?
                                        errors.comment : null
                                    }
                                />
                            </FormControl>


                            <Box display='flex' justifyContent='flex-end'>
                                <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                size="small"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                >
                                    Post
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

NoteCommentForm.propTypes = {
    noteId: PropTypes.string,
    triggerUrl: PropTypes.string,
    prevComment: PropTypes.object,
}

export default NoteCommentForm
