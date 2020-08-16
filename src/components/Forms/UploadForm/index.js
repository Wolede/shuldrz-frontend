import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'components/Dialog'
import { useStyles } from './style'
import { Box, CircularProgress, FormHelperText } from '@material-ui/core'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import api from 'services/Api'
const firebase = require("firebase/app");


const UploadForm = ({ user }) => {
    // console.log(user, 'in profile');
    const classes = useStyles()

    const [isSuccessful, setIsSuccessful] = useState()
    const [isDeleted, setIsDeleted] = useState()
    const [uploading, setIsUploading] = useState(false)

    
    // const [file, setFile] = useState();

    
    
    const [openDialog, setOpenDialog] = useState(false);
    const [view, setView] = useState();

    const handleDialogOpenUpload = () => {
        setOpenDialog(true)
        setView('uploadProfileImage')
    }

    const handleDialogOpenDelete = () => {
        setOpenDialog(true)
        setView('deleteProfileImage')
    }

    const handleDialogClose = () => {
        setOpenDialog(false)
    }

    const deleteImage = async () => {
        setIsUploading(true)
        try {
            const res = await api.delete(`upload/files/${user.profileImage.id}`)

            // console.log(res, 'deleted?');


            trigger(`/users/${user?.id}`)
            // mutate(`/users/${user?.id}`, { ...user, profileImage: null })

            const snapshot = await firebase.firestore().collection('chats').where('users', 'array-contains', user.username).get()
        
        snapshot.forEach(doc => {         
            const selectedUser = doc.data().usersDetails.filter(_user => _user.userId !== user.id)[0]
            const deleteImageResponse = res.status 
            
            if(deleteImageResponse === 200){
                const usersDetails =[
                    {
                        userId: user.id,
                        image: null
                    }, 
                    {
                        userId: selectedUser.userId,
                        image: selectedUser.image
                    }
                ]

                doc.ref.update({
                    usersDetails : [...usersDetails]
                })
            }   
            
        })

            setIsDeleted({
                status: true,
            })
        } catch(error) {
            setIsDeleted({
                status: false,
            })
            
        }
        handleDialogClose()

        setTimeout(() => {
            setIsUploading(false)
        }, 4000);
    }

    const uploadImage = async (file) => {
        setIsUploading(true)

        console.log(file[0]);
        let data = new FormData()
        data.append('files', file[0])
        data.append('refId', user.id)
        data.append('ref', 'user')
        data.append("source", "users-permissions")
        data.append('field', 'profileImage')

        
        try {
            const uploadRes = await api.post(`upload`, data)

            trigger(`/users/${user?.id}`)
            // console.log('uploaded?', uploadRes);

            const snapshot = await firebase.firestore().collection('chats').where('users', 'array-contains', user.username).get()

            snapshot.forEach(doc => {         
            const selectedUser = doc.data().usersDetails.filter(_user => _user.userId !== user.id)[0]
            const uploadedImage = uploadRes.data[0].url
            
            const usersDetails =[
                {
                    userId: user.id,
                    image: uploadedImage
                }, 
                {
                    userId: selectedUser.userId,
                    image: selectedUser.image
                }
            ]


            
            doc.ref.update({
                usersDetails : [...usersDetails]
            })
        })

            setIsSuccessful({
                status: true,
            })
        } catch(error){
            setIsSuccessful({
                status: false,
                message: message
            })
        }
        setTimeout(() => {
            setIsUploading(false)
        }, 4000); 
        
        
    }


    return (
        <>
            <Box className={classes.root}>
                <Box position='relative' width='fit-content'>
                    <Avatar 
                        alt={user.username} 
                        src={user.profileImage ? user.profileImage.url : '/'} 
                        size={'small'} 
                    />
                    {uploading && 
                        <CircularProgress size={24} className={classes.buttonProgress}/>
                    }
                </Box>
                <Box display="flex" alignItems="center" className={classes.childRoot}>
                    <Box>
                        <Button 
                        variant="contained" 
                        color="secondary"
                        size="small"
                        onClick={handleDialogOpenUpload}
                        >
                            Upload New Picture
                        </Button>
                    </Box>
                    <Box>
                        <Button 
                            variant="contained" 
                            color="error"
                            size="small"
                            onClick={handleDialogOpenDelete}
                        >
                            Delete Picture
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box marginBottom='2rem'>
                <FormHelperText 
                        // style={{ textAlign: 'center' }} 
                        error={isSuccessful?.status === false ? true : false}
                    >
                        {
                            isSuccessful?.status === false ? 
                            'an error occured' 
                            : null
                        }
                    </FormHelperText>
                    <FormHelperText 
                        // style={{ textAlign: 'center' }} 
                        error={isDeleted?.status === false ? true : false}
                    >
                        {
                            isDeleted?.status === false ? 
                            'an error occured'
                            : null
                        }
                    </FormHelperText>
            </Box>




            {/* Load Custom Dialog COmponent */}
            {openDialog === true &&
                (
                    <Dialog 
                    handleClose={handleDialogClose} 
                    openDialog={openDialog} 
                    disableEscape={false} 
                    view={view}
                    uploadImage={uploadImage}
                    deleteImage={deleteImage}
                    />
                )
            }
        </>
    )
}

UploadForm.propTypes = {
    user: PropTypes.object
}

export default UploadForm