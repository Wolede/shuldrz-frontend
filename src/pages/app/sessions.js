import React, { useState } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import AppLayout from 'components/Layouts/AppLayout'
import Paper from 'components/Paper'
import ChatProfiles from 'components/ChatProfiles'
import Head from 'next/head'
import { ProtectRoute } from '../../contexts/Auth'


const Sessions = (props) => {
    // const classes = useStyles()
    

    return (
        <div>
            <Head>
                <title>Shuldrz | Sessions</title>
            </Head>
            <AppLayout>
                <Grid
                    container
                    direction="row"
                >
                    <Paper height='100vh' borderTopRightRadius="0" borderBottomRightRadius="0" width='30%' padding="0">
                        <ChatProfiles/>
                    </Paper>
                    <Paper height='100vh' borderTopLeftRadius="0" borderBottomLeftRadius="0" width='70%' color="secondary">
                        Sessions
                    </Paper>

                </Grid>

            </AppLayout>
        </div>
    )
}

export default ProtectRoute(Sessions)
