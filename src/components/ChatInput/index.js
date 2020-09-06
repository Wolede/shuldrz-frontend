import React, { useState } from 'react'
import { FormControl, FormHelperText, InputAdornment, IconButton, TextField, Box } from '@material-ui/core'
import { Send } from '@material-ui/icons';
import { useStyles } from './styles'

const ChatInput = (props) => {
    const classes = useStyles(props)
    const [chatText, updateChatText] = useState('')

    const { isGroupDisabled } = props

    const userTyping = (e) => {
        // when shift and enter is pressed 
        // e.keyCode == 13 && e.shiftKey ? setMultiline(true) : null;
        // to send message. i.e only enter is pressed        
        e.keyCode == 13 && !e.shiftKey ? submitMessage() : updateChatText(e.target.value);
    };

    const messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    
    const [value, setValue] = React.useState('');

    const handleChange = (e) => {
      setValue(e.target.value)
    };
    
    const submitMessage = () => {        
        if(messageValid(chatText) && chatText !== '') {
            props.submitMessageFn(chatText);            
            updateChatText('')
        }
        setValue('')
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
                placeholder={isGroupDisabled ? 'You can no longer send messages here. This group has been disabled by the admin.' : 'Say something nice...'}
                // multiline
                // rows={1}
                autoComplete="off"
                onFocus={props.userClickedInput}
                value={value}
                onChange={handleChange}
                InputProps={
                    isGroupDisabled ? null :
                    {
                        endAdornment: (
                            <InputAdornment position="end">
                            <Send className={classes.sendBtn} onClick={submitMessage}/>
                            </InputAdornment>
                        ),
                    }
                }
                disabled={isGroupDisabled}
            />

        </Box>
    )
}

export default ChatInput
