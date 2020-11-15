import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Box, Typography, Grid, Switch, FormControlLabel } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Button from 'components/Button'
import Modal from 'components/Modal'
import moment from 'moment'
import useAuth from 'contexts/Auth'
import useSWR, { mutate, trigger, useSWRPages } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import WallNote from '../../WallNote'


const WallLayout = ({isPublic}) => {
    const classes = useStyles()
    const { user, loading } = useAuth()

    const router = useRouter()
    const noteUrl = router.query.note
    // console.log('url', noteUrl);

    const [isMoreData, setIsMoreData] = useState(true);
    const PAGE_SIZE = 30; //changed to 30 #lede
    const START_POSITION_IN_CONFIG_URL = 19; // index location of the first digit of the start position in the config url

    const [requestUrl, setRequestUrl] = useState(`/wall-notes?_start=0&_limit=${PAGE_SIZE}&_sort=createdAt:desc`)
    const [wallUser, setWallUser] = useState(null)

    // const { data, error, isValidating } = useSWR(loading ? false : requestUrl, api.get, {revalidateOnFocus: true})


    const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages(
        "wall",
        ({ offset, withSWR }) => {
            // console.log('off', offset, requestUrl, wallUser)

            const url = offset || requestUrl;

            const {data} = withSWR(useSWR(url, api.get, {revalidateOnFocus: true}));

            if (!data) return null;
            // console.log('dat',data)
            return (
                <Grid container spacing={2}>
                    { data.data.map((note, key) => (
                        <Grid
                            item
                            xl={3}
                            md={3}
                            sm={6}
                            xs={12}
                            key={key}
                        >
                            <WallNote 
                                id={note.id}
                                title={note.title}
                                note={note.note}
                                hearts={note.hearts}
                                color={note.color}
                                link={note.link}
                                usersLiked={note.usersLiked}
                                date={moment(note.createdAt).calendar()}
                                dedication={note.dedication}
                                userData={note.user}
                                urlQuery={noteUrl}
                                isPublic={isPublic}
                                triggerUrl={requestUrl}
                            />
                        </Grid>

                    ))}
                </Grid>
            )
        },
        SWR => {
            // console.log('dat2', SWR.data, SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7), parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7)))
            if(SWR.data.data.length < 1 && user && !SWR.data.config.url.includes('undefined')) {
                setIsMoreData(false);
            } else {
                setIsMoreData(true)
            }
            const previousStart = parseInt(SWR.data.config.url.substr(START_POSITION_IN_CONFIG_URL, 7))
            // console.log('prev', previousStart)
            return requestUrl.includes('user') 
                ? `/wall-notes?_start=${previousStart + PAGE_SIZE}&_limit=${PAGE_SIZE}&user=${wallUser}&_sort=createdAt:desc`
                : `/wall-notes?_start=${previousStart + PAGE_SIZE}&_limit=${PAGE_SIZE}&_sort=createdAt:desc`
        },
        [loading, wallUser]
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

    // const notes = data ? data.data : null
    // console.log(notes, 'wall-notes')


    // const [notes, setNotes] = useState(false);


    // const getNotes = async () => {
    //     try {
    //         const { data } = await api.get('wall-notes')
    //         setNotes(data)
    //         console.log(data, 'here');
    //     } catch (error) {

    //     }
    // }


    // useEffect(() => {
    //     getNotes()
    // }, [])

    const handleSwitchChange = (event) => {
        if (event.target.checked) {
            setRequestUrl(`/wall-notes?_start=0&_limit=${PAGE_SIZE}&user=${event.target.name}&_sort=createdAt:desc`)
            setWallUser(event.target.name);
        } else {
            setRequestUrl(`/wall-notes?_start=0&_limit=${PAGE_SIZE}&_sort=createdAt:desc`)
            setWallUser(null);
        }
        // console.log('walluser', event.target.name)
    }

    // open write note
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    // console.log('pini', isMoreData, pages)

    return (
        <div>
            {!isPublic && (
                <>
                <Box marginBottom="2rem" display="flex">
                    <Box className={classes.headerText}>
                        <Typography variant="h3">Shuldrz Wall</Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" color="primary" size="medium" onClick={handleOpen}>Add Note</Button>
                    </Box>
                </Box>

                <Box marginBottom="2rem" display="flex">
                    <Box className={classes.headerText} display="flex" alignItems="center">
                        <Typography variant="body2">Post public notes</Typography>
                    </Box>
                    <Box>
                        <FormControlLabel
                            name={user?.id}
                            control={<Switch color="secondary" />}
                            label="Show only my notes"
                            labelPlacement="start"
                            onChange={handleSwitchChange}
                        />
                    </Box>
                </Box>
                </>
            )}

            {/* {!notes ? (
                <Skeleton variant="rect" height={150} animation="wave"/>
            ) : notes.length === 0 ? (
                <Typography variant='body2'>No notes right now</Typography>
            ) : (
                <Grid container spacing={2}>
                    { notes.map((note, key) => (
                        <Grid
                            item
                            xl={3}
                            md={3}
                            sm={6}
                            xs={12}
                            key={key}
                        >
                            <WallNote 
                                id={note.id}
                                title={note.title}
                                note={note.note}
                                hearts={note.hearts}
                                color={note.color}
                                link={note.link}
                                usersLiked={note.usersLiked}
                                date={moment(note.createdAt).calendar()}
                                dedication={note.dedication}
                                userData={note.user}
                                urlQuery={noteUrl}
                                isPublic={isPublic}
                                triggerUrl={requestUrl}
                            />
                        </Grid>

                    ))}
                </Grid>
            )} */}

            {pages}
            
            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal handleClose={handleClose} openModal={openModal} view='writeNote' embedUrl={null} triggerUrl={requestUrl} />
                )
            }
            
            { isMoreData &&
                <div ref={setElement}>
                    { isLoadingMore &&
                        <Skeleton variant="rect" height={150} animation="wave"/>
                    }
                    
                </div>
            }

            {/* Not perfect - if general notes page is empty, no msg will be displayed */}
            {/* { pages?.filter(page => !page.key.includes('user') && !page.key.includes('null')).length < 2 && !isMoreData &&
                <Box textAlign="center" paddingTop="100px"> 
                    <Typography align="center" variant="body2">No notes for now</Typography>
                </Box>
            } */}
        </div>
    )
}

WallLayout.propTypes = {
    public: PropTypes.bool
}

export default WallLayout
