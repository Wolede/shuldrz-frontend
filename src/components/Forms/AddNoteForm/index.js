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
import { GithubPicker, CirclePicker } from 'react-color';


const AddNoteForm = props => {
    const classes = useStyles()
    const { user } = useAuth();
    const [isSuccessful, setIsSuccessful] = useState()
    
    const initialValues = {
        dedication: false,
        title: '',
        note: '',
        color: '#3F316B',
        link: '',
    }
    const validationSchema = Yup.object({
        dedication: Yup.bool(),
        title: Yup.string().max(40, "You've hit the 40 character limit").required('You missed this'),
        note: Yup.string().max(1000, "You've hit the 1000 character limit. Add another note after").required('Come on! Get it off your chest'),
        color: Yup.string(),
        link: Yup.string(),
    })



    const onSubmit = async (values) => {

        let newTitle = values.dedication ? `Dedicated to ${values.title}` : values.title

        try {
            const res = await api.post(`wall-notes`, {
                dedication: values.dedication,
                title: newTitle,
                note: values.note,
                color: values.color,
                link: values.link,
                user: user.id
            })
            
            console.log('let see', res);
            trigger(props.triggerUrl, api.get)
            props.onClose()
            
        } catch (error) {
            console.log(error, 'error')
            setIsSuccessful(false)
        }

    }

    return (
        <Box>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Add Note</Typography>
                <Typography variant="caption" gutterBottom>This will be visible publicly</Typography>
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
                        <FormControl className={classes.formControl}>
                            <FormControlLabel
                                control={<Switch { ...getFieldProps('dedication')} name="dedication" color="secondary" />}
                                label="Dedicate this to someone?"
                            />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField 
                                name="title" 
                                id="title" 
                                label={values.dedication ? "What's their name?" : "Title"}
                                value={values.title}
                                { ...getFieldProps('title')}
                                variant="outlined"
                                helperText={ errors.title && touched.title ?
                                    errors.title : null
                                }
                            />
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <TextField 
                                name="note" 
                                id="note" 
                                label={
                                    values.dedication ? 
                                        values.title.length > 0 ? 
                                        `How has ${values.title} helped you?` : 
                                        "How have they helped you?" 
                                    : "Write something"
                                }
                                { ...getFieldProps('note')}
                                variant="outlined"
                                multiline
                                rows={6}
                                // error={errors.snippetNote && touched.snippetNote ? true : false}
                                helperText={ errors.note && touched.note ?
                                    errors.note : null
                                }
                            />
                        </FormControl>
                        
                        {values.dedication && (
                            <FormControl className={classes.formControl}>
                                <TextField 
                                    name="link" 
                                    id="link" 
                                    label={values.title.length > 0 ? `Add a link to ${values.title}` : 'Add link to dedication'}
                                    { ...getFieldProps('link')}
                                    variant="outlined"
                                    helperText={ errors.link && touched.link ?
                                        errors.link : null
                                    }
                                />
                            </FormControl>
                        )}

                        <FormControl className={classes.formControl}>
                            <div className={classes.colorWrapper}>
                            <Typography variant="body2" gutterBottom>Pick a color</Typography>
                            <CirclePicker 
                                colors={['#3F316B', '#00C766', '#F3B700', '#FD4659', '#292F36']}
                                circleSize={32}
                                color={values.color}
                                onChangeComplete={(color) => setFieldValue('color', color.hex)}
                                />
                                
                            </div>
                        </FormControl>

                        <Box marginTop='1.5rem' display='flex' justifyContent='flex-end'>
                            <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
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

AddNoteForm.propTypes = {

}

export default AddNoteForm