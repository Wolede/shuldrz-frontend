import React, { useState } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import Avatar from 'components/Avatar'
import Paper from 'components/Paper'
import { useStyles } from './styles'




const ChatProfile = (props) => {
    const classes = useStyles()
    
    // const {className, ...rest} = props

    const chats = [
        {
            img: 'happy-woman.png',
            name: 'Sarah Michaels',
            message: 'Thank you so much'
        },
        {
            img: 'happy-woman.png',
            name: 'Folashade',
            message: 'Hola'
        }
    ]
    const [activeChat, setActiveChat] = useState(chats[0])

     const toggleActive = (index) => {      
        // console.log(activeChat[index])  
        console.log('clicked')
        return setActiveChat(chats[index])        
    }

    const toggleActiveStyles = (index) => {
        if (chats[index] === activeChat) {
            console.log('activeClass' + [index] + 'active')
            return 'active'           
        } else{
            console.log('inactiveClass' + [index] + 'inactive')
            return 'inactive'
            
        }
    }

    return (
        chats.map((chat, i) => {
            // console.log(toggleActiveStyles(i));
            return (
                <Paper className={toggleActiveStyles(i)} padding="16px" active={true}>
                    <Grid
                        
                        onClick={(i) => toggleActive(i)}
                        className={classes.grid}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >

                        <Avatar alt="profile picture" src={`/images/${chat.img}`} size="small" variant='rounded' />
                        {/* <img src='/images/happy-woman.png'/> */}
                        <Grid
                            container
                            direction="column"
                            className={classes.typography}
                        >
                            <Typography className={classes.h4} variant="h4">{chat.name}</Typography>
                            <Typography variant="body2">{chat.message}</Typography>
                        </Grid>

                    </Grid>
                </Paper>
            )
        })

    )



}

export default ChatProfile
