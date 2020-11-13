import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Grid, Typography, TextField, InputAdornment } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ProfileCard from 'components/ProfileCard';
import useAuth from 'contexts/Auth';
import api from 'services/Api';
import useSWR, { trigger, useSWRPages } from 'swr';
import { useStyles } from './style';
import debounce from 'lodash/debounce';
import LoopIcon from '@material-ui/icons/Loop';
import SearchIcon from '@material-ui/icons/Search';


const BuddiesLayout = () => {
    // `/users?_sort=createdAt:desc&_limit=5`
    const classes = useStyles()
    const { user, loading } = useAuth();
    const [isMoreData, setIsMoreData] = useState(true);
    const PAGE_SIZE = 30; // changed to 30 #lede
    const START_POSITION_IN_CONFIG_URL = 35; // index location of the first digit of the start position in the config url

    const [searchLoading, setSearchLoading] = useState(false);

    const [requestUrl, setRequestUrl] = useState(`/users?_sort=createdAt:desc&_start=0&_limit=${PAGE_SIZE}`);
    const [searchQuery, setSearchQuery] = useState(null);

    const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages(
        "buddies",
        ({ offset, withSWR }) => {
            // console.log('off', offset)
            const url = offset || requestUrl;
            const {data} = withSWR(useSWR( url, api.get, {revalidateOnFocus: true}));

            if (!data) return null;
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
                        userType={result.userType}
                        firstName={result.firstName}
                        lastName={result.lastName}
                    />
                </Grid>
            ))
        },
        SWR => {
            // console.log('dat2', SWR.data, SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7), parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7)))
            if(SWR.data.data.length < 1 && user && !SWR.data.config.url.includes('undefined')) {
                setIsMoreData(false);
            } else {
                setIsMoreData(true)
            }
            const previousStart = parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7))
            // return `/users?_sort=createdAt:desc&_start=${previousStart + PAGE_SIZE}&_limit=${PAGE_SIZE}`
            return requestUrl.includes('_q') 
                ? `/users?_sort=createdAt:desc&_start=${previousStart + PAGE_SIZE}&_limit=${PAGE_SIZE}&_q=${searchQuery}`
                : `/users?_sort=createdAt:desc&_start=${previousStart + PAGE_SIZE}&_limit=${PAGE_SIZE}`
        },
        [loading, searchQuery]
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


    const getSearchedUsers = async (query) => {
        try {
            let resBuddies 
            // console.log(resBuddies)
            setSearchLoading(true);

            if(query.trim()) {
                //the next line is just for the sake of having an sync function to make the loader take effect
                resBuddies = await api.get(`/users`)
                // trigger(`/users?_sort=createdAt:desc&_start=0&_limit=${PAGE_SIZE}&_q=${query.trim()}`)
                setRequestUrl(`/users?_sort=createdAt:desc&_start=0&_limit=${PAGE_SIZE}&_q=${query}`);
                setSearchQuery(query)
                
            } else {
                //the next line is just for the sake of having an sync function to make the loader take effect
                resBuddies = await api.get(`/users`)
                setRequestUrl(`/users?_sort=createdAt:desc&_start=0&_limit=${PAGE_SIZE}`);
                setSearchQuery(null)
            }

            setSearchLoading(false);

        } catch (error) {
            // console.log('failed')
            // setBuddies([])
            setSearchLoading(false);
        }
    }

    const debouncedSearch = useCallback(
        debounce(value => getSearchedUsers(value), 1000)
    );

    const handleChange = (e) => {
        const {value} = e.target; 
        debouncedSearch(value);
    }

    return (
        <div>
            <Box marginBottom="2rem" display="flex">
                <Box className={classes.headerText}>
                    <Typography variant="h3">Humans</Typography>
                </Box>
                <Box>
                    <TextField 
                        name="buddies" 
                        variant="outlined" 
                        // label="Humans" 
                        placeholder="Search humans"
                        autoComplete='off'
                        // error={errors.buddies && touched.buddies ? true : false}
                        // helperText={ errors.buddies && touched.buddies ?
                        //     errors.buddies : null
                        // }
                        onChange={handleChange}
                        InputProps={
                            (searchLoading) 
                                ? {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <LoopIcon className={classes.loader} />
                                        </InputAdornment>
                                    ),
                                }
                                : {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon/>
                                        </InputAdornment>
                                    ),
                                }
                        }
                    />
                </Box>
            </Box>
            
            {/* Render the page data */}
            <Grid container spacing={4}>{pages}</Grid>
            
            { isMoreData &&
                <div ref={setElement}>
                    { isLoadingMore &&
                        <Skeleton variant="rect" height={150} animation="wave"/>
                    }
                    
                </div>
            }

            { pages.length < 2 && !isMoreData &&
                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">No buddies for now</Typography>
                </Box>
            }
        </div>
    )
}

export default BuddiesLayout
