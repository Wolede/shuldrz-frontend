import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Paper from 'components/Paper'
import { Typography, Box, Fab } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useStyles } from './style'
import Modal from 'components/Modal'
import Button from 'components/Button'

const VideoBox = props => {
    const classes = useStyles(props)
    const { title, link, type } = props

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <Paper borderRadius="1.875rem 0.625rem 1.875rem 1.875rem" padding="1rem" marginBottom="3rem">
            <Box paddingLeft="2rem">
                <Typography variant="subtitle1" gutterBottom>{ title }</Typography>
            </Box>
            
            <Box 
                className={classes.videoImage} 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                borderRadius="1.875rem"
            >
                { type === 'video' && (
                    <Fab color="primary" aria-label="play" className={classes.fabButton} onClick={handleOpen}>
                        <PlayArrowIcon />
                    </Fab>
                )}
                { type === 'blogPost' && (
                    <a href={link} target="_blank" style={{textDecoration:'none'}}>
                        <Button variant="contained" color="warning"> Read Article </Button>
                    </a>
                )}
                

            </Box>
            {/* Load Custom Modal COmponent */}
            {openModal === true &&
                (
                    <Modal handleClose={handleClose} openModal={openModal} view='video' embedUrl={link} />
                )
            }
        </Paper>
    )
}

VideoBox.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    backgroundImage: PropTypes.string,
}

export default VideoBox
