import React, { useState, useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import api from 'services/Api'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { FormControl, FormHelperText, TextField, Checkbox, InputAdornment, Typography, Box, Chip } from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import Button from 'components/Button'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import debounce from 'lodash/debounce';
// import { SelectedUserContext } from 'contexts/SelectedUserContext';
const firebase = require("firebase/app");



const AddSessionsForm = ({onClose, submitNewChat, updateSelectedChat}) => {
    const { user, loading } = useAuth();
    
    const classes = useStyles()

    const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
    const checkedIcon = <CheckBoxIcon fontSize="small"/>;


    const [isSuccessful, setIsSuccessful] = useState()
    const [buddies, setBuddies] = useState([]);
    //allBuddies holds a collective of all the buddies fetched in the component lifecycle
    const [allBuddies, setAllBuddies] = useState([]);

    const [searchLoading, setSearchLoading] = useState(false);
    // const [data, setData] = useState({})
    // const [ , setSelectedUser ] = useContext(SelectedUserContext)

    // const PAGE_LIMIT = 5

    // const getFormOptions = async () => {
    //     try {
    //         const resBuddies = await api.get(`/users?_limit=${PAGE_LIMIT}`)
            
    //         setBuddies([]);         
    //         // setBuddies(resBuddies.data.filter(usr => usr.id !== user?.id));         

    //         console.log('budsss', resBuddies.data.filter(usr => usr.id !== user?.id))

    //     } catch (error) {
    //         setBuddies(null)
    //     }
    // } 

    const getSearchedUsers = async (query) => {
        try {
            let resBuddies;
            if(query.trim()) {
                setSearchLoading(true);
                //using trim because usernames can't have spaces
                resBuddies = await api.get(`/users?username_contains=${query.trim()}`)
                const buddiesMinusUser = resBuddies.data.filter(usr => usr.id !== user?.id);
                setBuddies(buddiesMinusUser);         
                // console.log('budsssSe', resBuddies.data.filter(usr => usr.id !== user?.id))
                setAllBuddies([...allBuddies, ...buddiesMinusUser])
                setSearchLoading(false);
            } 

        } catch (error) {
            // console.log('failed')
            setBuddies([])
            setSearchLoading(false);
        }
    }

    const debouncedSearch = useCallback(
        debounce(value => getSearchedUsers(value), 1000)
    );

    const handleChange = (e) => {
        const {value} = e.target; 
        debouncedSearch(value);
    }

    // const handleBlur = () => {
    //     setBuddies([]);
    // }


    // useEffect(() => {
    //     user ? getFormOptions() : null;
    // }, [loading])

    const fetchedValues = {
        buddies: [],
    }

    const validationSchema = Yup.object({
        buddies: Yup.array().required("You can't do this alone. Choose at least one human 😊"),
    })


    const onSubmit = async (values) => {
        
        const users = values.buddies;
        console.log('VALUES.BUDDIES', users)
        
        const usersDetails = values.buddies.reduce((acc, curr) => {
            const buddiesObject = allBuddies.find(bud => bud.username === curr);
            if (buddiesObject) {
                acc.push({ 
                    userId: buddiesObject.id, 
                    username: buddiesObject.username, 
                    image: buddiesObject?.profileImage?.url ? buddiesObject?.profileImage?.url : null,
                    isAdmin: false,
                    isPresent: true,
                    hasDeletedChat: false
                });
            }
            return acc; 
        }, [])

        // console.log('jer', users, usersDetails);
        
        
        const data = { users: [...users], usersDetails: [...usersDetails] }

        
        
        // Add isAdmin & isPresent property to the userDetails object
        //    data.usersDetails.map(_user => {
        //         let detail = _user
        //         detail.image === undefined ? null : detail.image
        //         detail.isAdmin = false
        //         detail.isPresent = true   
        //         detail.username = _user.username                     
        //         return detail
        //     })

        //Pushing the admin details to the usersDetails array
        const userImage = user.profileImage ? user.profileImage.url : null
        data.usersDetails.push({userId: user.id, image: userImage, isAdmin: true, isPresent: true, username: user.username, hasDeletedChat: false})
        data.users.push(user.username)
       
        // console.log('USER DETAILS', data.usersDetails, data.usersDetails.map(det => det.userId))

        
        if (data.usersDetails.length > 2 ) {
            //concatenate userName in the users array to create groupName
            let groupName = users.join(', ').toString()
            //Send group chat details to firebase
            const docKey = new Date().getTime().toString();       
            await
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
                usersDetails: data.usersDetails,
                receiverHasRead: false,
                docKey,
                groupName
            })
            //when a new group chat is created, make the index 0 chat (which is the newly created group chat) active
            updateSelectedChat(0);
        } else {
            const selectedUser = buddies.find(usr => usr.id === usersDetails.find(usr => usr)?.userId)
            // console.log('motif', selectedUser)
            // await setSelectedUser(selectedUser)
            submitNewChat(selectedUser);

            // const newBuildDocKey = () =>  data.usersDetails.map(det => det.userId).sort().join('');
            // const docKey = newBuildDocKey();  
            // await 
            // firebase
            // .firestore()
            // .collection('chats')
            // .doc(docKey)
            // .set({
            //     messages: [{
            //         sender: user.username,
            //         session: 'none',  
            //     }],                
            //     currentTime: Date.now(),
            //     users: data.users,
            //     usersDetails: data.usersDetails.map( usr => ({ userId: usr.userId, image: usr.image }) ),
            //     receiverHasRead: false
            // })
        }

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
                            <Box display="flex" marginBottom=".5rem">
                                <Typography variant="h4" style={{ fontWeight: 600, flexGrow: 1 }}>
                                    New Session
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
                                Select up to 4 humans
                            </p>
                            
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
                                    // onBlur={handleBlur}
                                    onChange={(event, newValue) => {
                                        //first condition allows for selection to not exceed 3
                                        //second condition allows you to deselect some selections even after selection has reached 3
                                        values.buddies.length <= 3 || newValue.length <= 3  ? setFieldValue("buddies", newValue) : null
                                    } }
                                    renderOption={(option, { selected }) => {
                                        return (
                                            <React.Fragment>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    style={{ marginRight: 8 }}
                                                    checked={ values.buddies.length <= 4 ? selected : false}
                                                />
                                                {option}
                                            </React.Fragment>
                                        )
                                    }}
                                    renderInput={(params) => {
                                        return (
                                            <TextField 
                                                {...params} 
                                                name="buddies" 
                                                variant="outlined" 
                                                label="Humans" 
                                                placeholder="Add to a session"
                                                // error={errors.buddies && touched.buddies ? true : false}
                                                helperText={ errors.buddies && touched.buddies ?
                                                    errors.buddies : null
                                                }
                                                onChange={handleChange}
                                                InputProps={
                                                    (searchLoading) 
                                                        ? {
                                                                className: params.InputProps.className,
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <LoopIcon className={classes.loader} />
                                                                    </InputAdornment>
                                                                ),
                                                            }
                                                        : { ...params.InputProps }
                                                }
                                            />
                                        )
                                    }}
                                />
                            </div>
                        </Box>

                        <Box display='flex' justifyContent='flex-end'>
                            {/* <FormControl className={classes.formControl}>
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
                            </FormControl> */}
                            
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
