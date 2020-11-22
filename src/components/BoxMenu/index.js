import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from 'components/Modal'

const BoxMenu = (props) => {
 // open write journal
 const [openModalWriteJournal, setOpenModalWriteJournal] = useState(false);
 const handleOpenWriteJournal = () => {
     setOpenModalWriteJournal(true);
 };

 const handleCloseWriteJournal = () => {
     setOpenModalWriteJournal(false);
 };

 // open write note
 const [openModalWriteNote, setOpenModalWriteNote] = useState(false);
 const handleOpenWriteNote = () => {
     setOpenModalWriteNote(true);
 };

 const handleCloseWriteNote = () => {
     setOpenModalWriteNote(false);
 };
    
const isOverADay = (noteDate) => {
    let now = new Date()
    const oneDay = 60 * 60 * 24 * 1000

    let compare = (now - new Date(noteDate)) > oneDay

    // console.log(now, oneDay, new Date(noteDate), compare);
    return compare
}

    return (
        <>
            {props.view === "journalBox" && (
            <>
                <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={props.handleClick}
                color='secondary'
                >
                    <KeyboardArrowDownIcon fontSize="large" style={{ color: '#ffffff' }} />
                </IconButton>

                <Menu
                id="simple-menu"
                anchorEl={props.anchorEl}
                keepMounted
                open={Boolean(props.anchorEl)}
                onClose={props.handleClose}
                >
                <MenuItem onClick={props.setVisibility}>Set to {props.isVisible ? 'Private' : 'Public'}</MenuItem>
                <MenuItem onClick={handleOpenWriteJournal}>Edit</MenuItem>
                <MenuItem onClick={props.deleteSnippet}>Delete</MenuItem>
                </Menu>
            </>
            )}

            {props.view === "wallNote" && (
                <>
                <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={props.handleClick}
                color='secondary'
                >
                    <KeyboardArrowDownIcon fontSize="large" style={{ color: '#ffffff' }} />
                </IconButton>

                <Menu
                id="simple-menu"
                anchorEl={props.anchorEl}
                keepMounted
                open={Boolean(props.anchorEl)}
                onClose={props.handleClose}
                >   
                    {!isOverADay(props.note.date) && <MenuItem onClick={handleOpenWriteNote}>Edit</MenuItem>}
                    <MenuItem onClick={props.deleteNote}>Delete</MenuItem>
                </Menu>
            </>
            )}

            {props.view === "noteComment" && (
                <>
                <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={props.handleClick}
                color='secondary'
                >
                    <KeyboardArrowDownIcon />
                </IconButton>

                <Menu
                id="simple-menu"
                anchorEl={props.anchorEl}
                keepMounted
                open={Boolean(props.anchorEl)}
                onClose={props.handleClose}
                >   
                    <MenuItem onClick={props.deleteComment}>Delete</MenuItem>
                </Menu>
            </>
            )}

            {/* Load Custom Modal COmponent */}
            {openModalWriteJournal === true &&
                (
                    <Modal handleClose={handleCloseWriteJournal} openModal={openModalWriteJournal} view='writeJournal' embedUrl={null} pageLimit={props.pageLimit} prevJournal={props.journal}/>
                )
            }


            {/* Load Custom Modal COmponent */}
            {openModalWriteNote === true &&
                (
                    <Modal handleClose={handleCloseWriteNote} openModal={openModalWriteNote} view='writeNote' embedUrl={null} triggerUrl={props.note.triggerUrl} prevNote={props.note} />
                )
            }
        </>
    )
}

BoxMenu.propTypes = {
    options: PropTypes.array,
    isVisible: PropTypes.bool,
    id: PropTypes.string,
    view: PropTypes.string,
    pageLimit: PropTypes.number
}

export default BoxMenu
