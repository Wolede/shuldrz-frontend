import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Button } from '@material-ui/core'
// import Button from 'components/Button'
import { useStyles } from './style';
import { Facebook, Mail, Twitter } from 'react-feather';

const Share = ({note}) => {
    const classes = useStyles()

    const truncate = (string, maxLength) => {
        if (string.length > maxLength) {
            return `${string.substring(0, maxLength)}...`
        } else {
            return string;
        }
    }

    //web share fallback
    return (
        <Box className={classes.root}>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Share Note</Typography>
            </Box>
            <Box>
                <a
                    target="_blank"
                    href={`
                       mailto:?subject=${note.title} by ${note.userData.username} from shuldrz.com&body=${note.title} -%0D%0A%0D%0A${note.note}%0D%0A%0D%0AVisit https://shuldrz-frontend.now.sh/wall?note=${note.id}
                    `}
                >
                    <Button variant="contained" startIcon={<Mail/>} size="small">Send as Email</Button>
                </a>
                <a
                    target="_blank"
                    href={`
                        https://twitter.com/intent/tweet/?text=${note.title} by ${note.userData.username}%0D%0A%0D%0A${truncate(note.note, 150)}%0D%0A%0D%0A at&url=https://shuldrz-frontend.now.sh/wall?note=${note.id}
                    `}
                >
                    <Button variant="contained" startIcon={<Twitter/>} size="small">Twitter</Button>
                </a>
                <a
                    target="_blank"
                    href={`
                        https://facebook.com/sharer/sharer.php?u=https://shuldrz-frontend.now.sh/wall?note=${note.id}
                    `}
                >
                    <Button variant="contained" startIcon={<Facebook/>} size="small">Facebook</Button>
                </a>
            </Box>
        </Box>
    )
}

Share.propTypes = {

}

export default Share
