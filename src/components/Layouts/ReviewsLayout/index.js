import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { useSWRPages } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import ReviewBox from '../../ReviewBox'

// WHEN YOU REFRESH THE PAGE THE USER-ID IS UNDEFINED SO NOTHING IS FETCHED

const ReviewsLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();
    const [isMoreData, setIsMoreData] = useState(true);
    const PAGE_SIZE = 5;
    const START_POSITION_IN_CONFIG_URL = 16; // index location of the first digit of the start position in the config url


    const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages(
        "reviews",
        ({ offset, withSWR }) => {
            console.log('off', offset)
            const url = offset || `/reviews?_start=0&review_users.id=${user?.id}&_limit=${PAGE_SIZE}`;
            const {data} = withSWR(useSWR( url, api.get));

            if (!data) return null;
            // console.log('dat',data)
            return data.data.map((result, key) => (
                <ReviewBox 
                    key={key} 
                    comment={result.comment} 
                    hearts={result.hearts} 
                    userImage={result.review_users[1].profileImage ? result.review_users[1].profileImage.url : null} 
                    username={result.review_users[1].username} 
                />
            ))
        },
        SWR => {
            // console.log('dat2', SWR.data, SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7), parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7)))
            if(SWR.data?.data?.length < 1) {
                setIsMoreData(false);
            }
            const previousStart = parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7))
            return `/reviews?_start=${previousStart + PAGE_SIZE}&review_users.id=${user?.id}&_limit=${PAGE_SIZE}` 
        },
        []
    )

    const loader = useRef(loadMore)
    const observer = useRef(null)
    const [element, setElement] = useState(null);

    useEffect(() => {
        observer.current = new IntersectionObserver(
            entries => {
                const first = entries[0];
                if (first.isIntersecting) {
                    loader.current()
                }
            },
            { threshold: 1 }
        )
    }, [])

    useEffect(() => {
        loader.current = loadMore;
    }, [loadMore])

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        }

    }, [element])

    return (
        <div>
            <Box marginBottom="2rem">
                <Typography variant="h3">Reviews</Typography>
            </Box>

            <div>{pages}</div>

            { isMoreData &&
                <div ref={setElement}>
                    { isLoadingMore &&
                        <Skeleton variant="rect" height={150} animation="wave"/>
                    }
                    
                </div>
            }

            { isEmpty &&
                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">No Reviews for now</Typography>
                </Box>
            }
            
        </div>

    )
}

export default ReviewsLayout