import { Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Paper from 'components/Paper'
import Avatar from 'components/Avatar'
import Chip from 'components/Chip'
import Button from 'components/Button'
import { useStyles } from './style';
import { SelectedUserContext } from 'contexts/SelectedUserContext';
import useAuth from 'contexts/Auth';

const ProfileCard = (props) => {
    const router = useRouter()
    const classes = useStyles()
    const { user } = useAuth();

    const { username, email, profileImage, occupation, experience, heart, ranking, id, userType, firstName, lastName } = props

    const [selectedUser, setSelectedUser] = React.useContext(SelectedUserContext)

    const [messageDisabled, setMessageDisabled] = React.useState(false)

    const handleMessageUser =  async (e) => {
        await setMessageDisabled(true);
        
        setSelectedUser({
            id,
            username,
            profileImage,
            firstName,
            lastName,
            occupation,
            ranking,
            heart,
            experience                   
        })
        router.push('/app/sessions')
    }

    return (
        <Paper padding="1.5rem 1.5rem 1.5rem 1.5rem" marginBottom="2rem">
            <Box display="flex" flexDirection="column" alignItems='flex-start' justifyContent="center">
                <Avatar
                    alt={username}
                    src={profileImage ? profileImage.url : '/empty'}
                    size="medium"
                    autoWidth
                    marginBottom="1.5rem"
                />
                <Typography variant="h4" className={classes.headerText}>{username}</Typography>

                <Typography variant="body1" className={classes.text}>{experience ? experience : '- - -'}</Typography>

                <Box display="flex" justifyContent="center" flexWrap="wrap">
                    {userType === 'Volunteer' &&
                        <Chip label={ranking ? ranking.name : 'Bronze'} rank={ranking ? ranking.colourCode : '#cd7f32'} color="paper" margin=".25rem .25rem .25rem 0" />
                    }
                    <Chip label={heart ? heart.count.toString() : '0'} heart color="paper"/>
                </Box>

                <Box width="100%" display="flex" justifyContent="flex-start" flexWrap="wrap" className={classes.buttonGroup}>
                    {user.username !== username && (
                    <div>
                        <Button variant="contained" size="small" color="primary" onClick={handleMessageUser} disabled={messageDisabled} loading={messageDisabled}>message</Button>
                    </div>

                    )}
                    <Link href="/app/users/[username]" as={`/app/users/${username}`}>
                        <a style={{textDecoration:'none'}}>
                            <Button variant="contained" size="small" color="secondary" >View Profile</Button>
                        </a>
                    </Link>

                </Box>
            </Box>
        </Paper>




        // <Card className={classes.card}>
        //     <img src='/images/happy-woman.png' />
        //     <Typography variant="h5">Sarah Michaels</Typography>
        //     <Typography variant="body1">Product Designer</Typography>
        //     <div>
        //         <Button variant="contained" color="primary" size="small">MESSAGE</Button>
        //         <Button variant="contained" color="primary" size="small">View Profile</Button>
        //     </div>
        // </Card>
    )
}

ProfileCard.proptypes = {
    username: PropTypes.string,
    profileImage: PropTypes.object,
    occupation: PropTypes.string,
    heart: PropTypes.string,
    ranking: PropTypes.object,
    id: PropTypes.string,
}

export default ProfileCard;