import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'components/Dialog'
import { useStyles } from './style'
import { Box } from '@material-ui/core'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import api from 'services/Api'
const firebase = require("firebase/app");
import { SelectedUserContext } from 'contexts/SelectedUserContext';


const UploadForm = ({ user }) => {
    // console.log(user, 'in profile');
    const classes = useStyles()
    const [isSuccessful, setIsSuccessful] = useState()
    const [selectedUser, setSelectedUser] = React.useContext(SelectedUserContext)
    // console.log('SELECTED USER', selectedUser)
    
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
        const res = await api.delete(`upload/files/${user.profileImage.id}`)
        console.log(res, 'deleted?');
        handleDialogClose()


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
    }

    const uploadImage = async (file) => {
        console.log(file[0]);
        let data = new FormData()
        data.append('files', file[0])
        data.append('refId', user.id)
        data.append('ref', 'user')
        data.append("source", "users-permissions")
        data.append('field', 'profileImage')
     
        const uploadRes = await api.post(`upload`, data)

        console.log('uploaded?', uploadRes);

        // const selectedUserImage = selectedUser.profileImage ? selectedUser.profileImage.url : null


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
    }


    return (
        <>
            <Box display="flex" marginBottom="2.5rem">
                <Avatar 
                    alt={user.username} 
                    src={user.profileImage ? user.profileImage.url : '/'} 
                    size={'small'} 
                />
                <Box display="flex" alignItems="center" className={classes.spacingRight}>
                    <Button 
                    variant="contained" 
                    color="secondary"
                    size="small"
                    onClick={handleDialogOpenUpload}
                    >
                        Upload New Picture
                    </Button>
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