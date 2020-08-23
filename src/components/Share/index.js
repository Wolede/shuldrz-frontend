import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'
import Button from 'components/Button'

const Share = ({note}) => {
    //web share fallback
    return (
        <Box>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Share Note</Typography>
            </Box>
            {/* <a class="share-btn fb" href="https://facebook.com/sharer/sharer.php?u=https://pakin.me/blog/create-share-button-with-web-share-api/" target="_blank">Share</a>
            <a class="share-btn tw" href="https://twitter.com/intent/tweet/?text=Web+Share+API+with+fallback&url=https://pakin.me/blog/create-share-button-with-web-share-api/&via=pknme" target="_blank">Tweet</a>
            <a class="share-btn pk" href="https://getpocket.com/edit?url=https://pakin.me/blog/share-button-with-web-share-api/" target="_blank">Save</a> */}
            <Box>
                <a
                    target="_blank"
                    href={`
                        https://twitter.com/intent/tweet/?text=${note.title} by ${note.userData.username} at &url=https://shuldrz-frontend.now.sh/wall?note=${note.id}
                    `}
                >
                    <Button variant="contained" size="small">Twitter</Button>
                </a>
                <a
                    target="_blank"
                    href={`
                        https://facebook.com/sharer/sharer.php?u=https://shuldrz-frontend.now.sh/wall?note=${note.id}
                    `}
                >
                    <Button variant="contained" size="small">Facebook</Button>
                </a>
            </Box>
        </Box>
    )
}

Share.propTypes = {

}

export default Share
