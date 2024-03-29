import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Box, Typography, TextField, FormControl, FormHelperText, InputLabel, Select, MenuItem} from '@material-ui/core'
import Button from 'components/Button'
import { useStyles } from './style'
import useAuth from 'contexts/Auth'
import { trigger } from 'swr'
import api from 'services/Api'

const ReviewForm = ({ chatProfile, prevReview }) => {
    const classes = useStyles()
    const { user, loading } = useAuth();
    const [isSuccessful, setIsSuccessful] = useState()
    const [allRanks, setAllRanks] = useState([]);

    // console.log('gg', props.prevReview, props.chatProfile)

    const initialValues = {
        comment: prevReview ? prevReview.comment : '',
        hearts: prevReview ? prevReview.hearts : 1,
        review_users: [chatProfile.id, user.id],
        names: `${user.username} left ${chatProfile.username} a review`
    }
    const validationSchema = Yup.object({
        comment: Yup.string().max(150, "You've hit the 1000 character limit. Add another entry").required("Comment section cannot be empty"),
        hearts: Yup.number('give hearts').required('give hearts')
    })

    // console.log('user0', chatProfile?.ranking)

    const getAllRanks = async () => {
        try {
            const ranks = await api.get(`/rankings`)
            setAllRanks(ranks.data)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAllRanks()
    }, [])
    
    // console.log('rnk', allRanks)

    const onSubmit = async (values) => {
        const reviewRequest = prevReview ? api.put(`reviews/${prevReview.id}`, {
            comment: values.comment,
            hearts: values.hearts,
            review_users: values.review_users,
            names: values.names
        }) : api.post(`reviews`, {
            comment: values.comment,
            hearts: values.hearts,
            review_users: values.review_users,
            names: values.names
        })

        const getHeartCount = () => {
            let currentHearts = 0
            if(!prevReview) {
                currentHearts = values.hearts
            } else if (values.hearts > prevReview.hearts || values.hearts < prevReview.hearts) {
                currentHearts = values.hearts - prevReview.hearts
            }

            return currentHearts + chatProfile?.heart?.count
        } 

        const getRank = () => {
            const volunteerHearts = getHeartCount()
            // const volunteerCurrentRank = props.chatProfile?.ranking
            let volunteerRank = null

            // console.log('volunteer shii', volunteerHearts, volunteerRank)

            if(volunteerHearts < 100) {
                volunteerRank = allRanks.find(rank => rank.name === 'Bronze')
            } else if(volunteerHearts > 100 && volunteerHearts < 200) {
                volunteerRank = allRanks.find(rank => rank.name === 'Silver')
            } else if(volunteerHearts > 200 && volunteerHearts < 300) {
                volunteerRank = allRanks.find(rank => rank.name === 'Gold')
            } else if(volunteerHearts > 300) {
                volunteerRank = allRanks.find(rank => rank.name === 'Platinum')
            }

            return volunteerRank;
        }

        const rankingRequest = await api.put(`users/${chatProfile?.id}`, { ranking: getRank() })

        const heartRequest = api.put(`/hearts/${ chatProfile?.heart?.id}`, { user: chatProfile?.id, count: getHeartCount() })

        try {
            let res;
            res = await reviewRequest
            res = await heartRequest
            // console.log( 'chack this', chatProfile?.ranking.id, getRank()?.id )
            if ( chatProfile?.ranking.id !== getRank()?.id ) {
                res = await rankingRequest
            }

            setIsSuccessful({ status: true,})


        } catch (error) {
            const message = error.response.data.message[0].messages[0].message

            setIsSuccessful({
                status: false,
                message: message
            })
        }

    }

    return (
        <Box>
            <Box marginBottom='1.5rem'>
                <Typography variant="h4" gutterBottom>Leave a Review</Typography>
            </Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, touched, getFieldProps, setFieldValue, isSubmitting }) => (
                    <Form noValidate autoComplete="off">
                        {/* {console.log(values) } */}

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="heart_label">Select heart points</InputLabel>
                            <Select
                                labelId="heart_label"
                                id="hearts"
                                {...getFieldProps('hearts')}
                                label="Heart points"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                 
                            </Select>
                            <FormHelperText 
                                        style={{ textAlign: 'center' }} 
                                        error={errors.hearts && touched.hearts ? true : false}
                                    >
                                       {errors.hearts && touched.hearts ? errors.hearts : null}
                            </FormHelperText>
                        </FormControl>
                        <TextField
                            name="comment"
                            id="comment"
                            label="leave a review"
                            {...getFieldProps('comment')}
                            variant="outlined"
                            multiline
                            rows={6}
                            style={{ width: '100%' }}
                            error={errors.comment && touched.comment ? true : false}
                            helperText={errors.comment && touched.comment?
                                errors.comment : null
                            }
                        />

                        <Box marginTop='1.5rem' display='flex' justifyContent='flex-end'>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                            >
                                Submit
                                </Button>
                        </Box>
                        <FormControl className={classes.formControl}>
                            <Box>
                                <FormHelperText 
                                        style={{ textAlign: 'center' }} 
                                        error={isSuccessful?.status === false ? true : false}
                                    >
                                        {
                                            isSuccessful?.status === false ? 
                                                isSuccessful.message ? 
                                                    isSuccessful.message
                                                : 'an error occured' 
                                            : null
                                        }
                                    </FormHelperText>
                                    <FormHelperText 
                                        style={{ textAlign: 'center' }} 
                                        error={isSuccessful?.status === false ? true : false}
                                    >
                                        {
                                            isSuccessful?.status === true ? 
                                                'Review submitted!'
                                            : null
                                        }
                                    </FormHelperText>
                            </Box>
                        </FormControl>
                    </Form>
                )}
            </Formik>

        </Box>
    )
}

export default ReviewForm
