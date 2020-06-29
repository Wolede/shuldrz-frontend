import React from 'react'
import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, Container, Typography, Button as MuiButton, Box } from '@material-ui/core'
import Paper from 'components/Paper'
import { DropzoneArea } from 'material-ui-dropzone';


const Dialog = (props) => {
    const classes = useStyles();

    const { uploadImage } = props
    const [file, setFile] = React.useState()

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
                                    <MuiButton onClick={props.handleClose} color="primary">
                                        No
                                    </MuiButton>
                                    <MuiButton onClick={handleUploadSubmit} style={{color: "#FD2D55"}}>
                                        Yes
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
                                        No
                                    </MuiButton>
                                    <MuiButton onClick={props.deleteImage} style={{color: "#FD2D55"}}>
                                        Yes
                                    </MuiButton>
                                </DialogActions>
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
