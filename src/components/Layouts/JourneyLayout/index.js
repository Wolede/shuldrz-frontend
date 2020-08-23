import React, {useState, useContext, useEffect, useRef} from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { useSWRPages } from 'swr'
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
import ProfileCard from 'components/ProfileCard';

const firebase = require("firebase");

const JourneyLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();
    const [isMoreData, setIsMoreData] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [openTopicsModal, setOpenTopicsModal] = useState(false);
    const [showProfileBox, setShowProfileBox] = useState(true);
    const [suggestedBuddies, setSuggestedBuddies] = useState([]);

    
    const PAGE_SIZE = 12; //changed to 12 #lede
    const START_POSITION_IN_CONFIG_URL = 16; // index location of the first digit of the start position in the config url
    
    // console.log('user',user)


    const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages(
        "journey",
        ({ offset, withSWR }) => {
            // console.log('off', offset)
            const url = offset || `/journey?_start=0&_limit=${PAGE_SIZE}&user.id=${user?.id}&userType=${user?.userType}&_sort=createdAt:desc`;

            const {data} = withSWR(useSWR( url, api.get));

            if (!data) return null;
            // console.log('dat',data)
            return data.data.map((val, index) => (
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
                            <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()} - From Shuldrz</Typography>
                        </Box>

                        <AnnouncementBox announcement={val} />
                        
                        </>
                    )}

                    { val?.notes && ( // a unique key to only journals.journalSnippet
                        <>
                        <Box paddingLeft="1rem" marginBottom=".5rem">
                            <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                        </Box>
                        
                        <JournalBox journal={val} triggerUrl={url} />
                        
                        </>
                    )}

                </div>
            ))
        },
        SWR => {
            // console.log('dat2', SWR.data, SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7), parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7)))
            if(SWR.data.data.length < 1 && user && !SWR.data.config.url.includes('undefined')) {
                setIsMoreData(false);
            }
            const previousStart = parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7))
            return `/journey?_start=${previousStart + PAGE_SIZE}&_limit=${PAGE_SIZE}&user.id=${user?.id}&userType=${user?.userType}&_sort=createdAt:desc`
        },
        [loading]
    )

    const loader = useRef(null)
    const observer = useRef(null)
    const [element, setElement] = useState(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (first.isIntersecting) {
                    // console.log('bottom reaced')
                    loader.current()
                }
            },
            { threshold: 1 }
        )
    }, [])

    useEffect(() => {
        loader.current = loadMore;
    }, [loadMore, loading])

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;
        // console.log('i made it here')
        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                // console.log('also made i there')
                currentObserver.unobserve(currentElement);
            }
        }

    }, [element])

    const [chats, setChats] = useState(null);
    useEffect(() => {
        if ( user && (!user?.topics || user?.topics?.length < 1)) {
            setOpenTopicsModal(true)
        }

        //maybe we keep the following lines, maybe we don't
        if (user) {
            getSuggestedBuddies(user?.topics);

            getChats();
        }
    }, [user])

    // const journeyRes = useSWR(loading ? false : `/journey?_limit=-1&user.id=${user?.id}&userType=${user?.userType}&_sort=createdAt:desc`, api.get, {revalidateOnFocus: true})

    // const feeds = journeyRes?.data?.data.sort((a, b) => new Date(b.createdAt) - new Date (a.createdAt)) //sort by date

    // console.log('journeyRes', journeyRes.data?.data, feeds);

    


    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    // console.log('user', user)

    const handleProfileBoxClose = () => {
        setShowProfileBox(false)
    }

    const getSuggestedBuddies = async (selectedTopics) => {
        try {
            const buddies = await api.get(`/users?userType=Volunteer`)
            // console.log(buddies.data)
            const suggestedBuds = selectedTopics.reduce((acc, curr) => {
                    const matchedBud = buddies.data.filter(bud => bud.topics.some(topic => topic._id === curr))
                    if (matchedBud.length > 0) {
                        acc.push(...matchedBud)
                    }
                    return acc;
                }, [])
                //make unique
                .reduce((acc, curr) => {
                    const exists = acc.find(item => item._id === curr._id);
                    if(!exists){
                        acc.push(curr);
                    }
                    return acc;
                }, [])
                // randomize 
                .sort(() => Math.random() - 0.5)
                //truncate to 3
                .filter((bud, idx) => idx < 3)

            setSuggestedBuddies(suggestedBuds);
            // console.log(suggestedBuds)

        } catch (e) {
            console.log(e)
        }
    }

    const getChats = () => {
        firebase.firestore().collection('chats').where('users', 'array-contains', user.username).orderBy('currentTime', 'desc')
            .onSnapshot(res => {
                const firebase_chats = res.docs.map(doc => doc.data())    
                setChats(firebase_chats)    
            })  
    }

    // console.log('things', isMoreData, isLoadingMore, )
    return (
        <div>
            { (user && getProfileCompletion(user) !== '100%' && showProfileBox) &&
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

            { (user && chats && suggestedBuddies.length > 0 && chats?.length < 1 && user?.userType === "Guest") &&

                <div>
                {/* <div style={{ visibility: user?.userType === "Guest" ? 'visible' : 'hidden'}}> */}
                    <Box marginBottom="1.5rem" display="flex">
                        <Box className={classes.headerText}>
                            <Typography variant="h3">Suggested Buddies</Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={4}>
                        {
                            suggestedBuddies.map(bud => (
                                <Grid item xl={4} md={4} sm={6} xs={12} key={bud._id}>
                                    <ProfileCard 
                                        username={bud.username}
                                        profileImage={bud.profileImage}
                                        occupation={bud.occupation}
                                        experience={bud.experience}
                                        heart={bud.heart}
                                        id={bud.id}
                                        ranking={bud.ranking}
                                        email={bud.email}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            }

            {/* <Box marginBottom="2rem" display="flex" marginTop={user?.userType === "Guest" ? '0' : '-32rem'}> */}
            <Box marginBottom="2rem" display="flex">
                <Box className={classes.headerText}>
                    <Typography variant="h3">Journey</Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" size="medium" onClick={handleOpen}>Add To Journal</Button>
                </Box>
            </Box>

            {/* Render the page data */}
            {pages}

            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal handleClose={handleClose} openModal={openModal} view='writeJournal' embedUrl={null} pageLimit={PAGE_SIZE} />
                )
            }

            {openTopicsModal &&
                (
                    <Modal handleClose={() => setOpenTopicsModal(false)} openModal={openTopicsModal} view='addInterestedTopics' embedUrl={null} disableBackdropClick callback={getSuggestedBuddies}/>
                )
            }

            { isMoreData &&
                <div ref={setElement}>
                    { isLoadingMore &&
                        <Skeleton variant="rect" height={150} animation="wave"/>
                    }
                </div>
            }

            { pages.length < 2 && !isMoreData &&
                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">Your feed is empty</Typography>
                </Box>
            }

            { isMoreData && !isLoadingMore &&
                <Skeleton variant="rect" height={150} animation="wave"/>
            }

        </div>
    )
}

export default JourneyLayout
