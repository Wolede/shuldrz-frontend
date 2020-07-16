import React, { useState } from 'react'
import { FormControl, FormHelperText, InputAdornment, IconButton, TextField } from '@material-ui/core'
import { Send } from '@material-ui/icons';
import { useStyles } from './styles'

const ChatInput = (props) => {
    const classes = useStyles()
    const [chatText, updateChatText] = useState('')

    const userTyping = (e) => e.keyCode === 13 ? submitMessage() : updateChatText( e.target.value );
    const messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    

    const submitMessage = () => {
        if(messageValid(chatText)) {
            props.submitMessageFn(chatText);
            document.getElementById('chattextbox').value = '';
        }
        console.log('hey I was clicked')
    }

    return (
        <>
            <TextField
                className={classes.formControl}
                onKeyUp={(e) => userTyping(e)}
                variant="outlined"
                id='chattextbox'
                // color="primary"
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <Send className={classes.sendBtn} onClick={submitMessage}/>
                    </InputAdornment>
                ),
                }}
            />

        </>
    )
}

export default ChatInput
