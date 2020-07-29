import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Button from 'components/Button'
import JournalBox from 'components/JournalBox'
import ReviewBox from 'components/ReviewBox'
import { useStyles } from './style';
import useAuth from 'contexts/Auth'
import useSWR, { mutate } from 'swr'
import { SelectedUserContext } from 'contexts/SelectedUserContext';
import BackButton from 'components/BackButton'
import api from 'services/Api'
import moment from 'moment'


const UserPageLayout = ({username}) => {
    const classes = useStyles()
    const router = useRouter()
    const { loading } = useAuth();

    const journalRes = useSWR(loading ? false : `/journals?user.username=${username}&isVisible=true&_sort=createdAt:desc&_limit=5`, api.get, {revalidateOnFocus: true})
    const reviewRes = useSWR(loading ? false : `/reviews?review_users.username=${username}&_sort=createdAt:desc&_limit=5`, api.get, {revalidateOnFocus: true})

    const journals = journalRes ? journalRes.data?.data : null
    const reviews = reviewRes ? reviewRes.data?.data : null

    const feedsNested = [
        journals,
        reviews
    ]

    var feedsFlatten = [].concat(...feedsNested) // flatten array of objects
    const feeds = feedsFlatten.sort((a, b) => new Date(b.createdAt) - new Date (a.createdAt)) //sort by date

    console.log(feedsNested);

    // send message handler
    const [, setSelectedUser] = React.useContext(SelectedUserContext)
    const handleMessageUser =  async (e) => {
        
        setSelectedUser({
            username,
        })
        router.push('/app/sessions')
    }


    return (
        <div>
            <Box marginBottom="1.5rem">
                <BackButton />  
            </Box>
            <Box marginBottom="2rem" display="flex">
                <Box className={classes.headerText}>
                    <Typography variant="h4">
                        { `${username}'s profile` }
                    </Typography>
                </Box>
                <Box>
                    <Button variant="contained" color="primary" size="small" onClick={handleMessageUser}>Message</Button>
                </Box>
            </Box>

            {feedsNested[feedsNested.length -1] === undefined ? ( //check if last value in feedNested is empty. Means data is still loading
                
                <Skeleton variant="rect" height={150} animation="wave"/>

            ) : feeds.length === 0 ? (

                 <Box textAlign="center" paddingTop="100"> 
                    <Typography align="center" variant="body1">{username}'s feed is empty</Typography>
                </Box>
                
            ) : //feed goes here
                
                (
                    feeds.map((val, index) => {

                        return (
                            <div key={index}>

                            { val?.comment && val?.review_users[0].username === username && ( // a unique key to reviews
                                <>
                                <Box paddingLeft="1rem" marginBottom=".5rem">
                                    <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                                </Box>

                                <ReviewBox 
                                    comment={val.comment} 
                                    hearts={val.hearts} 
                                    userImage={val.review_users[1].profileImage ? val.review_users[1].profileImage.url : null} 
                                    username={val.review_users[1].username} 
                                    otherUser={username}
                                />

                                </>
                            )}

                            { val?.notes && ( // a unique key to only journals.journalSnippet
                                <>
                                <Box paddingLeft="1rem" marginBottom=".5rem">
                                    <Typography variant="body2" style={{ fontWeight: 600 }}>{moment(val.createdAt).calendar()}</Typography>
                                </Box>
                                
                                <JournalBox journal={val} otherUser={true} />
                                
                                </>
                            )}
        
                            </div>
                        )
                    })
                )
            }

        </div>
    )
}

UserPageLayout.propTypes = {
    username: PropTypes.string
}

export default UserPageLayout
