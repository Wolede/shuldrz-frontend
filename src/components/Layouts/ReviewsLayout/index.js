import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import ReviewBox from '../../ReviewBox'

const ReviewsLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();

    const { data, error, isValidating } = useSWR(loading ? false : `/reviews?review_users.id=${user?.id}`, api.get, {revalidateOnFocus: false})
    
    const reviews = data ? data.data : null
    console.log(reviews, 'reviews')

    return (
        <div>
            <Box marginBottom="2rem">
                <Typography variant="h3">Reviews</Typography>
            </Box>
            {!reviews ? (

                <Skeleton variant="rect" height={150} animation="wave"/>

            ) : reviews.length === 0 || error ? (

                <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">No Reviews for now</Typography>
                </Box>

            ) :  //review list goes here
                reviews.map((review, key) => {
                    const { comment, hearts, review_users } = review
                    
                    return (
         
                        <ReviewBox 
                        key={key} 
                        comment={comment} 
                        hearts={hearts} 
                        userImage={review_users[1].profileImage ? review_users[1].profileImage.url : null} 
                        username={review_users[1].username} />

                    )
                })
            }
        </div>

    )
}

export default ReviewsLayout