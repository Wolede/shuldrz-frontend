import React, { useState } from 'react'
import { FormControl, FormHelperText, InputAdornment, IconButton, TextField, Box } from '@material-ui/core'
import { Send } from '@material-ui/icons';
import EmojiTray from 'components/EmojiTray'
import { useStyles } from './styles';


const ChatInput = (props) => {
    const classes = useStyles(props)
    const [chatText, updateChatText] = useState('')
    const [showTray, setShowTray] = useState(false);
    // const [value, setValue] = React.useState(''); //value was set as the value of the value prop for TextField

    const { isGroupDisabled, chat, user} = props

    const userTyping = (e) => {
        // when shift and enter is pressed 
        // e.keyCode == 13 && e.shiftKey ? setMultiline(true) : null;
        // to send message. i.e only enter is pressed        
        e.keyCode == 13 && !e.shiftKey ? submitMessage() : updateChatText(e.target.value);
    };

    const messageValid = (txt) => txt && txt.replace(/\s/g, '').length;
    

    const handleChange = (e) => {
        updateChatText(e.target.value)
    };

    const onEmojiSelect = (emoji) => {
        updateChatText(`${chatText}${emoji.native}`)
    }
    
    const submitMessage = () => {        
        if(messageValid(chatText) && chatText !== '') {
            props.submitMessageFn(chatText);            
            updateChatText('')
        }
        // updateChatText('');
        setShowTray(false);
    }


    return (
        <Box
            position='sticky'
            width='100%'
            bottom='0'
        >
            <TextField
                className={classes.formControl}
                onKeyUp={userTyping}
                variant="outlined"
                id='chattextbox'
                placeholder={isGroupDisabled && chat.groupName && chat?.usersDetails?.find(det => det.isAdmin)?.userId === user.id ? 'You can no longer send messages here. This group has been disabled.' : isGroupDisabled && chat.groupName ? 'You can no longer send messages here' : 'Say something nice...'}
                // multiline
                // rows={1}
                autoComplete="off"
                onFocus={props.userClickedInput}
                value={chatText}
                onChange={handleChange}
                InputProps={
                    (isGroupDisabled && chat.groupName) ? null :
                    {
                        endAdornment: (
                            <InputAdornment position="end">
                                <EmojiTray onEmojiSelect={onEmojiSelect} showTray={showTray} setShowTray={setShowTray} />
                                <Send className={classes.sendBtn} onClick={submitMessage}/>
                            </InputAdornment>
                        ),
                    }
                }
                disabled={isGroupDisabled && chat.groupName ? true : false}
            />

        </Box>
    )
}

export default ChatInput
