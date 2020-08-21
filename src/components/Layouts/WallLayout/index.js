import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Button from 'components/Button'
import Modal from 'components/Modal'
import moment from 'moment'
import useAuth from 'contexts/Auth'
import useSWR, { mutate, trigger, useSWRPages } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'


const WallLayout = props => {
    const classes = useStyles()
    const { user, loading } = useAuth()

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
