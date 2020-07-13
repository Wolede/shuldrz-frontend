import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import useAuth from 'contexts/Auth'
import useSWR, { mutate } from 'swr'
import api from 'services/Api'
import { useStyles } from './style'
import AnnouncementBox from 'components/AnnouncementBox'
import moment from 'moment'


const JourneyLayout = () => {
    const classes = useStyles()
    const { user, loading } = useAuth();

    const journalRes = useSWR(loading ? false : `/journals?user.id=${user?.id}`, api.get, {revalidateOnFocus: false})
    const announcementRes = useSWR(loading ? false : `/announcements?userType=${user?.userType}`, api.get, {revalidateOnFocus: false})
    const sessionLogRes = useSWR(loading ? false : `/session-logs?user.id=${user?.id}`, api.get, {revalidateOnFocus: false})
    
    const journals = journalRes ? journalRes.data?.data : null
    const announcements = announcementRes ? announcementRes.data?.data : null
    const sessionLogs = sessionLogRes ? sessionLogRes.data?.data : null

    // const feeds = [
    //     journals ? journals[0].journalSnippet : undefined,
    //     announcements,
    //     sessionLogs,
    // ]


//     const profileCompletion = {
//         isCompleted: true,
//         percentage: null
//     }

//     return (
//         <div>
//             { !profileCompletion.isCompleted && (
//                 <p>completed!</p> //profile box goes here!
//             )}

//             <Box marginBottom="2rem">
//                 <Typography variant="h3">Journey</Typography>
//             </Box>

//             {!feeds ? (

//                 <Skeleton variant="rect" height={150} animation="wave"/>

//             ) : feeds.length === 0 ? (

//                 <Box textAlign="center" paddingTop="100"> 
//                     <Typography align="center" variant="body1">Your feed is empty</Typography>
//                 </Box>
                
//             ) : //feed goes here
//                 (
//                     // <AnnouncementBox />
//                     feeds.map((feed, key) => {

//                         // const sortedFeed = feed.sort((a, b) => b.createdAt - a.createdAt)

//                         return (
//                             <div key={key}>

//                                 {feed?.map(( val, index ) => {
//                                     // console.log(val);
                                    
//                                     return (
//                                         <>
//                                         { val.sessionUser && ( // a unique key to session logs
                                        
//                                             <p>SessionLog { moment(val.createdAt).calendar() }</p>
                                            
//                                         )}

//                                         { val.message && val.userType && ( //a unique key to Announcements
                                        
//                                             <p>Announcement { moment(val.createdAt).calendar() }</p>
                                            
//                                         )}

//                                         { val.notes && ( // a unique key to only journals.journalSnippet
                                        
//                                             <p>Journals { moment(val.createdAt).calendar() } </p>
                                            
//                                         )}
        
//                                         </>
//                                     )
        
//                                 })
//                                 }
//                             </div>
//                         )
//                     })
//                 )

//             }

//         </div>
//     )

    return <div>Hello</div>
}

export default JourneyLayout
