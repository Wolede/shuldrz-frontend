import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, useMediaQuery } from '@material-ui/core'
import Paper from 'components/Paper'
import BoxMenu from 'components/BoxMenu'
import { useTheme } from '@material-ui/styles';
import { useStyles } from './style'
import ReactMarkdown from "react-markdown"
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LockIcon from '@material-ui/icons/Lock';
import api from 'services/Api'
import useAuth from 'contexts/Auth'
// import { JournalContext } from 'contexts/JournalContext' 
import { trigger } from 'swr'


const JournalBox = ( { journal, otherUser } ) => {
    const classes = useStyles()
    const { user } = useAuth();

    const theme = useTheme();
    const isMobile= useMediaQuery(theme.breakpoints.up('sm'));

    const { notes, isVisible, id } = journal

    // const [ journal ] = useContext(JournalContext)
    // delete 
    const deleteSnippet = async () => {
        
        // console.log(journal[0].journalSnippet.filter(c => c.id !== id));
        // mutate( `/journals?user.id=${user?.id}&_limit=5`, journal[0].journalSnippet.filter(c => c.id !== id), false )
        try {
            const res = await api.delete(`journals/${id}`)
            trigger(`/journey?_start=0&_limit=7&user.id=${user?.id}&userType=${user?.userType}&_sort=createdAt:desc`, api.get)
            handleClose()
        } catch (error) {

        }
    }

    // update 
    const setVisibility = async () => {
        try {
            const res = await api.put(`journals/${journal.id}`, {
                isVisible: !isVisible,
            })
            trigger(`/journey?_start=0&_limit=7&user.id=${user?.id}&userType=${user?.userType}&_sort=createdAt:desc`, api.get)
            handleClose()
        } catch (error) {

        }

    }

    const [anchorEl, setAnchorEl] = React.useState(null);
  

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper borderRadius="1.875rem 0.625rem 1.875rem 1.875rem" padding="1rem" marginBottom="1.5rem" color="primary">
            <Box display="flex" className={classes.root}>
                <Box>
                    <Paper 
                        color="transPrimary" 
                        width={ isMobile ? '8rem' : '3.125rem' } 
                        borderRadius={isMobile ? null : '1.25rem'} 
                        height={isMobile ? '6.25rem' : '3.125rem'} 
                        padding=".5rem"
                    >

                        <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                            <FormatQuoteIcon style={{ fontSize: '3.5rem' }} />
                        </Box>
                        
                    </Paper>
                </Box>
                <Box flexGrow="1" paddingLeft={isMobile ? '2rem' : '1rem'} paddingRight={isMobile ? '2rem' : '1rem'} paddingTop={isMobile ? '.8rem' : '1.4rem'}>
                    {/* dont show this if you're viewing someone's profile */}
                    {!otherUser && (
                    <div className={classes.iconButtons}>

                        { isVisible ? (
                        <VisibilityIcon style={{ color: '#ffffff', fontSize: '1.2rem' }}/>
                        ) : (
                        <LockIcon style={{ color: '#ffffff', fontSize: '1.2rem' }}/>
                        )}

                        <BoxMenu 
                        className={classes.iconButton} 
                        isVisible={isVisible} 
                        id={id} 
                        setVisibility={setVisibility}
                        deleteSnippet={deleteSnippet}
                        anchorEl={anchorEl}
                        handleClick={handleClick}
                        handleClose={handleClose}
                        />
                    </div>
                    )}

                    <Typography 
                        variant="subtitle1" 
                        // dangerouslySetInnerHTML={{ __html : notes }} 
                        style={{ fontSize: '1.2rem', fontWeight: 400 }} 
                    >
                        <ReactMarkdown source={notes} />
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}

JournalBox.propTypes = {
    journal: PropTypes.object,
    otherUser: PropTypes.bool
}

export default JournalBox
