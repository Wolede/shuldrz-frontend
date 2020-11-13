import React, { useEffect, useState } from 'react';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import { Picker } from 'emoji-mart';

const EmojiTray = ({onEmojiSelect, showTray, setShowTray}) => {

    const onSelect = (emoji) => {
        onEmojiSelect(emoji);
    }

    return (
        <div style={{ marginRight: '10px', cursor: 'pointer' }}>
            {  !showTray 
                    ? <EmojiEmotionsOutlinedIcon onClick={() => setShowTray(!showTray)} />
                    : <CancelOutlinedIcon onClick={() => setShowTray(!showTray)} />
            }
            { showTray &&
                <Picker
                    style={{ 
                        position: 'absolute', bottom: '60px', right: '20px', 
                        // textOverflow: 'ellipsis',  overflow: 'hidden', whiteSpace: 'nowrap'
                    }}
                    onSelect={onSelect}
                    title='Pick your emoji!'
                    showPreview={false}
                    showSkinTones={false}
                    sheetSize={64}
                />
            }
        </div>
    )
}

export default EmojiTray;