import React, { useState, useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Button from 'components/Button'
import JournalBox from 'components/JournalBox'
import ReviewBox from 'components/ReviewBox'
import { useStyles } from './style';
import useAuth from 'contexts/Auth'
import useSWR, { useSWRPages } from 'swr'
import { SelectedUserContext } from 'contexts/SelectedUserContext';
import BackButton from 'components/BackButton'
import api from 'services/Api'
import moment from 'moment'


const UserPageLayout = ({username}) => {
    const classes = useStyles()
    const router = useRouter()
    const { user, loading } = useAuth();
    const [isMoreData, setIsMoreData] = useState(true);

    const PAGE_SIZE = 5;
    const START_POSITION_IN_CONFIG_URL = 21; // index location of the first digit of the start position in the config url

    const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages(
        "user-profile",
        ({ offset, withSWR }) => {
            // console.log('off', offset)  
            const url = offset || `/user-profile?_start=0&user.username=${username}&_limit=${PAGE_SIZE}&_sort=createdAt:desc`;
            const {data} = withSWR(useSWR( url, api.get));

            if (!data) return null;
            // console.log('dat',data)
            return data.data.map((val, index) => {

                return (
                    <div key={index}>

                    { val?.comment && val?.review_users[0].username === username && ( // a unique key to reviews
                        <>
                        <Box paddingLeft="1rem" marginBottom=".5rem">
                            <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                        </Box>

                        <ReviewBox 
                            comment={val.comment} 
                            hearts={val.hearts} 
                            userImage={val.review_users[1].profileImage ? val.review_users[1].profileImage.url : null} 
                            username={val.review_users[1].username} 
                            otherUser={username}
                        />

                        </>
                    )}

                    { val?.notes && ( // a unique key to only journals.journalSnippet
                        <>
                        <Box paddingLeft="1rem" marginBottom=".5rem">
                            <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                        </Box>
                        
                        <JournalBox journal={val} otherUser={true} />
                        
                        </>
                    )}

                    </div>
                )
            })
        },
        SWR => {
            console.log('dat2', SWR.data, SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7), parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7)))
            if(SWR.data.data.length < 1 && user && !SWR.data.config.url.includes('undefined')) {
                setIsMoreData(false);
            }
            const previousStart = parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7))
            return `/user-profile?_start=${previousStart + PAGE_SIZE}&user.username=${username}&_limit=${PAGE_SIZE}&_sort=createdAt:desc`
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

    // send message handler
    const [ selectedUser, setSelectedUser ] = useContext(SelectedUserContext)
    const [ userData, setUserData ] = useState()

    const getUser = async () => {
        try { 
            const { data } = await api.get(`users/?username=${username}`)
            setUserData(data[0])
            console.log(data, 'user data p');
        } catch(error) {

        }
    }
    const handleMessageUser =  async (e) => {
        //set selected user is now set in the RightSidebar where user's data is available
        setSelectedUser({
            id: userData?.id,
            username: userData?.username,
            profileImage: userData?.profileImage,   
        })
        router.push('/app/sessions')
    }

    useEffect(() => {
        getUser() // get user data
    }, [username])

    return (
        <div>
            <Box marginBottom="1.5rem">
                <BackButton />  
            </Box>
            <Box marginBottom="2rem" display="flex">
                <Box className={classes.headerText}>
                    <Typography variant="h4">
                        {username ? `${username}'s profile` : <Skeleton variant="rect" width={220} height={30} animation="wave"/> }
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" size="small" onClick={handleMessageUser} disabled={!selectedUser && !userData}>Message</Button>
                </Box>
            </Box>

            {pages}

            { isMoreData &&
                <div ref={setElement}>
                    { isLoadingMore &&
                        <Skeleton variant="rect" height={150} animation="wave"/>
                    }
                </div>
            }

            { pages.length < 2 && !isMoreData &&
                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">No profile activity yet</Typography>
                </Box>
            }

            { isMoreData && !isLoadingMore &&
                <Skeleton variant="rect" height={150} animation="wave"/>
            }

        </div>
    )
}

UserPageLayout.propTypes = {
    username: PropTypes.string
}

export default UserPageLayout
