import React, {useState, useEffect} from 'react'
import { Box, Typography, Grow } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import Paper from 'components/Paper'
import api from 'services/Api'
import { useStyles } from './style'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

SwiperCore.use([Pagination]);


const Quotes = () => {
    const [ open, setOpen ] = useState(false)
    const [ quotes, setQuotes ] = useState()

    const classes = useStyles(open)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const getQuotes = async () => {
        try {
            const {data} = await api.get('quotes')
            const shuffledQuotes = data.quotes.sort(() => Math.random() - 0.5)
            const limitQuotes = shuffledQuotes.slice(0, 3);
            setQuotes(limitQuotes);
        } catch (error) {

        }
    }
    useEffect(() => {
        getQuotes()
    }, [])

    return (
        <Box className={classes.root}>

            {!open && (
                <Box className={classes.iconRoot} onClick={handleOpen} >
                    <ChevronLeftIcon className={classes.icon} />
                </Box>
            )}

            {open && (

                <Grow
                in={open}
                style={{ transformOrigin: '100% 0 0' }}
                // {...(open ? { timeout: 1000 } : {})}
                >
                <Box className={classes.slideInBox}>
                    <Typography variant="body2" onClick={handleClose} align="right" className={classes.close}>
                        Close
                    </Typography>
                    <Box textAlign="center">
                        <FormatQuoteIcon color="primary" className={classes.quoteIcon} />
                    </Box>
                    {!quotes ? (
                        <Skeleton variant="rect" height={150} animation="wave"/>
                    ) : 
                        quotes.length === 0 ? (
                            <Typography align="center" variant="body1">No Quotes Today</Typography>
                        ) :
                            (
                                <Swiper 
                                    className={classes.swiper}
                                    pagination={{ clickable: true }} 
                                >
                                    {quotes.map((quote, key) => (
                                        <SwiperSlide key={key} className={classes.slide}>
                                            <Box textAlign='center'>
                                                {quote.quote}
                                                {quote.author}
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )

                    }
                </Box>
            </Grow>
            )}

        </Box>
    )
}

export default Quotes
