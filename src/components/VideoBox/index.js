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
        <Paper borderRadius="1.875rem 1.875rem 1.875rem 1.875rem" padding="1rem" marginBottom="3rem" color={type === 'announcement' ? 'primary' : null}>
            <Box display="flex" marginBottom="1rem" paddingLeft="1rem">
                {type === "announcement" ? (
                    <>
                    <Box>
                        <Paper 
                            width={'3.125rem'} 
                            borderRadius={'1.25rem'} 
                            height={'3.125rem'} 
                            padding=".5rem"
                        >
                            <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                                <img src='/images/favicon.png' alt="Shuldrz Icon" style={{ width: '3rem' }}/>
                            </Box>
                        </Paper>
                    </Box>
                    <Box flexGrow="1" padding=".4rem 0 0 1rem" >
                        <Typography variant="subtitle1">{ title }</Typography>
                    </Box>
                    </>
                ) : (
                    <Typography variant="subtitle1">{ title }</Typography>
                )}
            </Box>
            
            <Box 
                className={classes.videoImage} 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                borderRadius="1.875rem"
            >
                { type === 'video' || 'announcement' && (
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
