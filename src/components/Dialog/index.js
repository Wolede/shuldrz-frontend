import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, Container, Typography, Button as MuiButton, Box, Avatar, TextField } from '@material-ui/core'
import Paper from 'components/Paper'
import { DropzoneArea } from 'material-ui-dropzone';
import CancelIcon from '@material-ui/icons/Cancel';


const Dialog = (props) => {
    const classes = useStyles();

    const { uploadImage } = props
    const [file, setFile] = React.useState([])

    const handleUploadSubmit = () => {
        uploadImage(file)
        props.handleClose()
    }

    return (
        <MuiDialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={props.openDialog}
        onClose={props.handleClose}
        disableBackdropClick={props.disableEscape}
        disableEscapeKeyDown={props.disableEscape}
        className={classes.dialog}
        >
            <Box textAlign="center" paddingTop="3rem" paddingBottom="3rem">
                    <Paper padding="2.5rem 1.5rem 1rem 1.5rem">


                    { props.view === "uploadProfileImage" &&
                        (
                            <>
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    dropzoneText={"Click or drag an image here"}
                                    maxFileSize={5000000}
                                    onChange={(file) => setFile(file) }
                                />
                                <DialogActions>
                                    <MuiButton onClick={props.handleClose}  style={{color: "#FD2D55"}}>
                                        Cancel
                                    </MuiButton>
                                    <MuiButton onClick={handleUploadSubmit} color="primary" disabled={ file.length < 1 }>
                                        Upload
                                    </MuiButton>
                                </DialogActions>
                            </>

                        )
                    }


                    { props.view === "deleteProfileImage" &&
                        (
                            <>
                                <Typography variant="h4" align="center" gutterBottom>
                                    Are you sure you want to delete the image?
                                </Typography>
                                {/* <DialogContent>
                                    <DialogContentText>
                                        Kindly return to merchant and retry your transaction.
                                    </DialogContentText>
                                </DialogContent> */}
                                <DialogActions>
                                    <MuiButton onClick={props.handleClose} color="primary">
                                        No, go back
                                    </MuiButton>
                                    <MuiButton onClick={props.deleteImage} style={{color: "#FD2D55"}}>
                                        Yes, delete
                                    </MuiButton>
                                </DialogActions>
                            </>
                        )
                    }


                    { props.view === "leaveGroup" &&
                        (
                            <>
                                <Typography variant="h4" align="left" gutterBottom>
                                    {props.isAdmin ?
                                        "Are you sure you want to leave and disable the group?"
                                    : 
                                        "Are you sure you want to leave the group?"
                                    }
                                </Typography>
                                <Typography variant="body1" align="left" gutterBottom>
                                    If you leave, you won't be able to join again.                                  
                                </Typography>
                                <DialogActions>
                                    <MuiButton onClick={props.handleClose} color="primary">
                                        No, go back
                                    </MuiButton>
                                    <MuiButton onClick={props.leaveGroup} style={{color: "#FD2D55"}}>
                                        Yes, leave
                                    </MuiButton>
                                </DialogActions>
                            </>
                        )
                    }

                    { props.view === "removeBud" &&
                        (
                            <>
                                <Typography variant="h4" align="left" gutterBottom>                                    
                                    Are you sure you want to remove this person?                               
                                </Typography>
                                <Typography variant="body1" align="left" gutterBottom>
                                    If you remove them, they won't be part of the group anymore.                                  
                                </Typography>
                                <DialogActions>
                                    <MuiButton onClick={props.onClose} color="primary">
                                        No, go back
                                    </MuiButton>
                                    <MuiButton onClick={props.onSave} style={{color: "#FD2D55"}}>
                                        Yes, remove
                                    </MuiButton>
                                </DialogActions>
                            </>
                        )
                    }


                    {
                        props.view === "viewImage" &&  (
                            <>
                                <CancelIcon className={classes.icon} fontSize="large" onClick={props.handleClose}/>
                                <Avatar className={classes.img} alt="image received" src={props.image} size="huge"/>
                            </>
                        )
                    }

                    {
                        props.view === "editGroup" &&  (
                            <>
                                <Typography variant="h4" align="left">
                                    Group name
                                </Typography>
                                <Box display="flex" flexDirection="column" width="440px" marginTop="1.5rem">
                                    <TextField
                                        value={props.value}
                                        onChange={props.handleChange}
                                        placeholder="Type a group name"
                                    />

                                    <DialogActions>
                                        <MuiButton onClick={props.save} color="primary">
                                            Save
                                        </MuiButton>
                                        <MuiButton onClick={props.groupNameDialogClose} style={{color: "#FD2D55"}}>
                                        Cancel
                                        </MuiButton>
                                    </DialogActions>
                                </Box>   
                                
                            </>
                        )
                    }



                    </Paper>    
            </Box>
        </MuiDialog>
    )
}

Dialog.propTypes = {
    view : PropTypes.string,
    handleClose: PropTypes.func,
    openDialog: PropTypes.bool,
    disableEscape: PropTypes.bool,
}

export default Dialog
