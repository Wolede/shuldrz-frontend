import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Button from 'components/Button'
import Modal from 'components/Modal'
import moment from 'moment'
import useAuth from 'contexts/Auth'
import useSWR, { mutate, trigger, useSWRPages } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import WallNote from '../../WallNote'


const WallLayout = props => {
    const classes = useStyles()
    const { user, loading } = useAuth()

    const [notes, setNotes] = useState(false);

    const getNotes = async () => {
        try {
            const { data } = await api.get('wall-notes')
            setNotes(data)
            console.log(data, 'here');
        } catch (error) {

        }
    }


    useEffect(() => {
        getNotes()
    }, [])

    // open write note
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <Box marginBottom="2rem" display="flex">
                <Box className={classes.headerText}>
                    <Typography variant="h3">Wall</Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" size="medium" onClick={handleOpen}>Add Note</Button>
                </Box>
            </Box>

            {!notes ? (
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
                                title={note.title}
                                note={note.note}
                                hearts={note.hearts}
                                color={note.color}
                                link={note.link}
                                date={note.createdAt}
                                dedication={note.dedication}
                            />
                        </Grid>

                    ))}
                </Grid>
            )}
            
            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal handleClose={handleClose} openModal={openModal} view='writeNote' embedUrl={null} />
                )
            }

        </div>
    )
}

WallLayout.propTypes = {
    public: PropTypes.bool
}

export default WallLayout
