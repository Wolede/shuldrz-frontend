import React, { useState } from 'react'
import { FormControl, FormHelperText, InputAdornment, IconButton, TextField, Box } from '@material-ui/core'
import { Send } from '@material-ui/icons';
import { useStyles } from './styles'

const ChatInput = (props) => {
    const classes = useStyles()
    const [chatText, updateChatText] = useState('')

    const userTyping = (e) => {
        // when shift and enter is pressed 
        // e.keyCode == 13 && e.shiftKey ? setMultiline(true) : null;

        // to send message. i.e only enter is pressed
        e.keyCode == 13 && !e.shiftKey ? submitMessage() : updateChatText( e.target.value );

    };

    const messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    
    const [value, setValue] = React.useState('');

    const handleChange = (e) => {
      setValue(e.target.value)
    };
    
    const submitMessage = () => {
        if(messageValid(chatText)) {
            props.submitMessageFn(chatText);
            // document.getElementById('chattextbox').value = ''; // i used state instead
            setValue('')
        }
    }

    return (
        <Box
            position='sticky'
            width='100%'
            bottom='0'
        >
            <TextField
                className={classes.formControl}
                onKeyUp={(e) => userTyping(e)}
                variant="outlined"
                id='chattextbox'
                placeholder='Say something nice...'
                // multiline
                // rows={1}
                autoComplete="off"
                onFocus={props.userClickedInput}
                value={value}
                onChange={handleChange}
                InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <Send className={classes.sendBtn} onClick={submitMessage}/>
                    </InputAdornment>
                ),
                }}
            />

        </Box>
    )
}

export default ChatInput
