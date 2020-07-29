import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Box, Typography, TextField, FormControlLabel, Switch, FormControl, FormHelperText } from '@material-ui/core'
import Button from 'components/Button'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import { trigger } from 'swr'
import api from 'services/Api'

const ReviewForm = (props) => {
    const classes = useStyles()
    const { user } = useAuth();
    const [isSuccessful, setIsSuccessful] = useState()

    return (
        <Box>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Add Journal Entry</Typography>
                <Typography variant="caption" gutterBottom>You can choose to make this public on your profile</Typography>
            </Box>
            
        </Box>
    )
}

export default ReviewForm
