import React, { useState, useRef, useEffect } from 'react'
import Paper from 'components/Paper'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { mutate, trigger, useSWRPages } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import VideoBox from '../../VideoBox'

const TrainingsLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();
    const [isMoreData, setIsMoreData] = useState(true);
    const [pageConstants] = useState({
        pageLimit: 2,
        startPositionInRes: 18
    })

    const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages(
        "trainings",
        ({ offset, withSWR }) => {
            console.log('off', offset)
            const url = offset || `/trainings?_start=0&_limit=${pageConstants.pageLimit}`;
            const {data} = withSWR(useSWR( url, api.get));

            if (!data) return null;
            // console.log('dat',data)
            return data.data.map(result => (
                <VideoBox key={result.link} link={result.link} title={result.name} type={result.type} backgroundImage={result.backgroundImage?.url} />
            ))
        },
        SWR => {
            console.log('dat2', SWR.data, SWR.data.config.url[pageConstants.startPositionInRes])
            if(SWR.data?.data?.length < 1) {
                setIsMoreData(false);
            }
            const previousStart = parseInt(SWR.data.config.url[pageConstants.startPositionInRes])
            return `/trainings?_start=${previousStart + pageConstants.pageLimit}&_limit=${pageConstants.pageLimit}`
        },
        []
    )

    let error = {}
    // const { data, error, isValidating } = trainings;
    const trainings = null
    // console.log(trainings, 'trainings')
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
                <Typography variant="h3">Trainings</Typography>
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
                    <Typography align="center" variant="body1">No Trainings for now</Typography>
                </Box>
            }
            
        </div>
    )
}

export default TrainingsLayout
