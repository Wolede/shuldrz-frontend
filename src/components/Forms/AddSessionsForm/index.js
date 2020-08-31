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
const firebase = require("firebase/app");



const AddSessionsForm = ({onClose}) => {
    const { user, loading } = useAuth();
    
    const classes = useStyles()

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;


    const [isSuccessful, setIsSuccessful] = useState()
    const [buddies, setBuddies] = useState([]);
    const [data, setData] = useState({})

    const getFormOptions = async () => {
        try {
            const resBuddies = await api.get(`/users?userType=Volunteer`)
            
            setBuddies(resBuddies.data);            

            console.log('budsss', resBuddies.data)

        } catch (error) {
            setBuddies(null)
        }
    } 

    useEffect(() => {
        user ? getFormOptions() : null;
    }, [loading])

    const fetchedValues = {
        buddies: [],
    }

    const validationSchema = Yup.object({
        buddies: Yup.array().required('Buddies to chat with is empty'),
    })


    const onSubmit = async (values) => {
        
        const users = values.buddies;
        
        const usersDetails = values.buddies.reduce((acc, curr) => {
            const buddiesObject = buddies.find(bud => bud.username === curr);
            if (buddiesObject) {
                acc.push({ userId: buddiesObject.id, image: buddiesObject?.profileImage?.url ? buddiesObject?.profileImage?.url : null });
            }
            return acc; 
        }, [])
        
        
        const data = { users, usersDetails }
        // Add isAdmin & isPresent property to the userDetails object
       data.usersDetails.map(_user => {
            let detail = _user
            detail.image === undefined ? null : detail.image
            detail.isAdmin = false
            detail.isPresent = true            
            return detail
        })

        //Pushing the admin details to the usersDetails array
        const userImage = user.profileImage ? user.profileImage.url : null
        data.usersDetails.push({userId: user.id, image: userImage, isAdmin: true, isPresent: true})
        data.users.push(user.username)       
        console.log('USERS DETAILS', usersDetails)


        //concatenate userName in the users array to create groupName
        let groupName = users.join(', ').toString()
        console.log('DATA WITH USERS DETAILS', data)
                
        //Send group chat details to firebase
        const docKey = new Date().getTime().toString();       
        firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .set({
            messages: [{
                sender: user.username,                                   
            }],                
            currentTime: Date.now(),
            users: data.users,
            usersDetails,
            receiverHasRead: false,
            docKey,
            groupName
        })

        //close modal
        onClose()
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
                            <Autocomplete
                                    multiple
                                    id="buddies"
                                    options={
                                        buddies ? buddies.map(bud => bud.username) : [] 
                                    }
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    value={values.buddies}
                                    onChange={(event, newValue) => {
                                        setFieldValue("buddies", newValue)
                                    } }
                                    renderOption={(option, { selected }) => {
                                        return (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option}
                                            </React.Fragment>
                                        )
                                    }}
                                    renderInput={(params) => (
                                        <TextField 
                                            {...params} 
                                            name="buddies" 
                                            variant="outlined" 
                                            label="Buddies" 
                                            placeholder="Buddies to chat with"
                                            error={errors.buddies && touched.buddies ? true : false}
                                            helperText={ errors.buddies && touched.buddies ?
                                                errors.buddies : null
                                            }
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
