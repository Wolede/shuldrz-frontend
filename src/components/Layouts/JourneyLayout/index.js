import React, {useState, useContext} from 'react'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import Button from 'components/Button'
import JournalBox from 'components/JournalBox'
import AnnouncementBox from 'components/AnnouncementBox'
import ProfileCompletionBox from 'components/ProfileCompletionBox'
import SessionLogBox from 'components/SessionLogBox'
import moment from 'moment'
import Modal from 'components/Modal'
import {getProfileCompletion} from 'helpers'


const JourneyLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();

    const journalRes = useSWR(loading ? false : `/journals?user.id=${user?.id}&_sort=createdAt:desc&_limit=5`, api.get, {revalidateOnFocus: true})
    const announcementRes = useSWR(loading ? false : `/announcements?userType=${user?.userType}&_sort=createdAt:desc&_limit=5`, api.get, {revalidateOnFocus: true})
    const sessionLogRes = useSWR(loading ? false : `/session-logs?user.id=${user?.id}&_sort=createdAt:desc&_limit=5`, api.get, {revalidateOnFocus: true})
    
    // const [ , setJournal ] = useContext(JournalContext)
    // if (journalRes) setJournal(journalRes.data?.data);

    const journals = journalRes ? journalRes.data?.data : null
    const announcements = announcementRes ? announcementRes.data?.data : null
    const sessionLogs = sessionLogRes ? sessionLogRes.data?.data : null

    const feedsNested = [
        journals,
        announcements,
        sessionLogs,
    ]

    var feedsFlatten = [].concat(...feedsNested) // flatten array of objects
    const feeds = feedsFlatten.sort((a, b) => new Date(b.createdAt) - new Date (a.createdAt)) //sort by date

    console.log('user', user);
    

    // const profileCompletion = {
    //     isCompleted: true,
    //     percentage: null
    // }
    
    const [openModal, setOpenModal] = useState(false);
    const [showProfileBox, setShowProfileBox] = useState(true);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    

    const handleProfileBoxClose = () => {
        setShowProfileBox(false)
    }

    return (
        <div>
            { (getProfileCompletion(user) !== '100%' && showProfileBox) &&
                <ProfileCompletionBox 
                    announcement={{
                        message: 'Complete your profile to get 20 heart points',
                        title: 'Profile Completion',
                        logo: getProfileCompletion(user),
                    }}
                    onCancel={handleProfileBoxClose}
                    destination='/app/profile'
                />
            }

            <Box marginBottom="2rem" display="flex">
                <Box className={classes.headerText}>
                    <Typography variant="h3">Journey</Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" size="medium" onClick={handleOpen}>Add To Journal</Button>
                </Box>
            </Box>

            {feeds[0] === undefined ? (
                
                <Skeleton variant="rect" height={150} animation="wave"/>

            ) : feeds.length === 0 ? (

                 <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">Your feed is empty</Typography>
                </Box>
                
            ) : //feed goes here
                
                (
                    feeds.map((val, index) => {

                        return (
                            <div key={index}>

                            { val?.sessionUser && ( // a unique key to session logs
                                <>
                                <Box paddingLeft="1rem" marginBottom=".5rem">
                                    <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                                </Box>

                                <SessionLogBox sessionLog={val}/>

                                </>
                            )}

                            { val?.message && val?.userType && ( //a unique key to Announcements
                                <>
                                <Box paddingLeft="1rem" marginBottom=".5rem">
                                    <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                                </Box>

                                <AnnouncementBox announcement={val} />
                                
                                </>
                            )}

                            { val?.notes && ( // a unique key to only journals.journalSnippet
                                <>
                                <Box paddingLeft="1rem" marginBottom=".5rem">
                                    <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                                </Box>
                                
                                <JournalBox journal={val} />
                                
                                </>
                            )}
        
                            </div>
                        )
                    })
                )
            }


           {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal handleClose={handleClose} openModal={openModal} view='writeJournal' embedUrl={null} />
                )
            }

        </div>
    )
}

export default JourneyLayout
