import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Hidden, Fab } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import ProfileBox from '../ProfileBox'
// import UpcomingBox from '../UpcomingBox'
import AvailabilityBox from '../AvailabilityBox';
import PersonalityBox from '../PersonalityBox';
import useAuth from 'contexts/Auth'
import { useStyles } from './style'
import { SelectedUserContext } from 'contexts/SelectedUserContext';
import api from 'services/Api'
import useSWR from 'swr'


const RightSidebar = props => {
    const { open, variant, onClose, className, otherUser, ...rest } = props
    const classes = useStyles(props)

    // Get data for profile box, availability box and charity box 
    const { user, loading } = useAuth()

    // for profile box 
    // other user means we're on a user profile page
    const requestUrl = props.otherUser ? `/users?username=${props.otherUser}` : `/users/${user?.id}`

    const { data, error, isValidating } = useSWR(loading ? false : requestUrl, api.get, {revalidateOnFocus: false})
    
    // store the first array of data if it's another user
    const userData = data ? 
                        props.otherUser ?
                            data.data[0] :
                            data.data : 
                    null

    console.log(userData, 'user data in profile')


    // on a user profile page, set selected user
    // const [selectedUser, setSelectedUser] = useContext(SelectedUserContext)
    // useEffect(() => {
    //     setSelectedUser({
    //         id: userData?.id,
    //         username: userData?.username,
    //         profileImage: userData?.profileImage,   
    //     })

    // }, [userData])
    

    return (
        <Drawer
        anchor="right"
        onClose={onClose}
        open={open}
        variant={variant}
        classes={{ paper: classes.drawer }}
        >
            <div
            {...rest}
            className={classes.root}
            >
                <ProfileBox 
                    otherUser={otherUser}
                    userData={userData}
                />

                {!otherUser ? (
                    // <UpcomingBox />
                    <></>
                ) : (
                    <AvailabilityBox
                        userData={userData}
                    />
                )}

                <PersonalityBox
                    userData={userData}
                    otherUser={otherUser}
                />
                
                <Hidden mdUp>
                    <Fab 
                        size="medium" 
                        aria-label="back" 
                        color='secondary' 
                        onClick={onClose} 
                        className={classes.closeIcon}
                        >
                        <CloseIcon />
                    </Fab>
                </Hidden>
            </div>
        </Drawer>
    )
}

RightSidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
    otherUser: PropTypes.string
}

export default RightSidebar
