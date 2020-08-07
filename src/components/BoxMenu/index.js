import React from 'react'
import PropTypes from 'prop-types'
import {IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const BoxMenu = (props) => {

    


    return (
        <>
            <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={props.handleClick}
            color='secondary'
            >
                <MoreVertIcon style={{ color: '#ffffff' }} />
            </IconButton>

            <Menu
            id="simple-menu"
            anchorEl={props.anchorEl}
            keepMounted
            open={Boolean(props.anchorEl)}
            onClose={props.handleClose}
            >
            <MenuItem onClick={props.setVisibility}>Set to {props.isVisible ? 'Private' : 'Public'}</MenuItem>
            <MenuItem onClick={props.deleteSnippet}>Delete</MenuItem>
            </Menu>
        
        </>
    )
}

BoxMenu.propTypes = {
    options: PropTypes.array,
    isVisible: PropTypes.bool,
    id: PropTypes.string
}

export default BoxMenu
