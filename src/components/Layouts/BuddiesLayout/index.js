import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ProfileCard from 'components/ProfileCard';
import useAuth from 'contexts/Auth';
import api from 'services/Api';
import useSWR, { useSWRPages } from 'swr';
import { useStyles } from './style';


const BuddiesLayout = () => {
    // `/users?_sort=createdAt:desc&_limit=5`
    const classes = useStyles()
    const { user, loading } = useAuth();
    const [isMoreData, setIsMoreData] = useState(true);
    const PAGE_SIZE = 6;
    const START_POSITION_IN_CONFIG_URL = 35; // index location of the first digit of the start position in the config url


    const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages(
        "buddies",
        ({ offset, withSWR }) => {
            console.log('off', offset)
            const url = offset || `/users?_sort=createdAt:desc&_start=0&_limit=${PAGE_SIZE}`;
            const {data} = withSWR(useSWR( url, api.get));

            if (!data) return null;
            // console.log('dat',data)
            return data.data.map(result => (
                <Grid item xl={4} md={4} sm={6} xs={12} key={result.id}>
                    <ProfileCard 
                        username={result.username}
                        profileImage={result.profileImage}
                        occupation={result.occupation}
                        experience={result.experience}
                        heart={result.heart}
                        id={result.id}
                        ranking={result.ranking}
                        email={result.email}
                    />
                </Grid>
            ))
        },
        SWR => {
            console.log('dat2', SWR.data, SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7), parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7)))
            if(SWR.data?.data?.length < 1) {
                setIsMoreData(false);
            }
            const previousStart = parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7))
            return `/users?_sort=createdAt:desc&_start=${previousStart + PAGE_SIZE}&_limit=${PAGE_SIZE}`
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
                <Typography variant="h3"> Buddies </Typography>
            </Box>
            
            <Grid container spacing={4}>{pages}</Grid>
            
            { isMoreData &&
                <div ref={setElement}>
                    { isLoadingMore &&
                        <Skeleton variant="rect" height={150} animation="wave"/>
                    }
                    
                </div>
            }

            { isEmpty &&
                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">No Buddies for now</Typography>
                </Box>
            }
        </div>
    )
}

export default BuddiesLayout
