import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box, Card, CardContent, CardActionArea, CardMedia} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import api from 'services/Api'
import useAuth from 'contexts/Auth'
import useSWR from 'swr'
import { useStyles } from './style'

const SponsoredAdBox = props => {
    const classes = useStyles()
    const { loading } = useAuth()

    const { data, error, isValidating } = useSWR(loading ? false : `/sponsore-ads?_limit=1&_sort=createdAt:desc`, api.get, {revalidateOnFocus: false})
    
    const advert = data ? data.data : null

    return (
        <>
        {
            !advert ? (
                <Skeleton variant="rect" height={150} animation="wave"/>
            ) : 
            advert.length === 0 || error ? (
                    <div></div>
                ) :
                advert.map((ad, key) => (
                    <Card key={key} className={classes.card}>
                    <a href={ad.link} target="_blank" style={{ textDecoration: 'none' }}>
                    <CardActionArea>  
                        <CardMedia
                        className={classes.media}
                        image={ad.image.url}
                        title={ad.name}
                        />
                        <CardContent>
                        <Typography variant="caption" color="secondary">
                            { ad.name }
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </a>
                    </Card>
                ))
        }
        </>
    )
}

SponsoredAdBox.propTypes = {

}

export default SponsoredAdBox
