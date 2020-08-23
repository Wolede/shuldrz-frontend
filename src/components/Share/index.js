import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import Button from 'components/Button'

const Share = props => {
    //web share fallback
    return (
        <Box>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Share Note</Typography>
            </Box>
            <Box>
                <a
                
                >
                    <Button variant="contained">Twitter</Button>
                </a>
            </Box>
        </Box>
    )
}

Share.propTypes = {

}

export default Share
