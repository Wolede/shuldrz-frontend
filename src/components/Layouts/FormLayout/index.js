import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core';
import Button from 'components/Button'
import Link from 'next/link'
import { useStyles } from './style'

const FormLayout = props => {
    const { children, page } = props
    const classes = useStyles(props)

    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    // className={classes.content}
                    item
                    lg={6}
                    md={6}
                    xs={12}
                >
                    <div className={classes.content}>
                        <div className={classes.contentHeader}>
                            {page === 'login' && (
                                <>
                                <Typography variant="h2" className={classes.headerText}>
                                    Hi there!
                                </Typography>
                                <Typography variant="h5" className={classes.contentText}>
                                    Login to your account
                                </Typography>
                                </>
                            )}
                            {page === 'signup' && (
                                <>
                                <Typography variant="h2" className={classes.headerText}>
                                    Get Started
                                </Typography>
                                <Typography variant="h5" className={classes.contentText}>
                                    Start your journey with us now
                                </Typography>
                                </>
                            )}
                            {page === 'volunteer' && (
                                <>
                                <Typography variant="h2" className={classes.headerText}>
                                    Get Started as a Buddy
                                </Typography>
                                <Typography variant="h5" className={classes.contentText}>
                                    Ready to help out people in need?
                                </Typography>
                                </>
                            )}
                        </div>
                        <div className={classes.contentBody}>
                            { children }
                        </div>     
                    </div>
                    
                </Grid>
                <Grid
                    className={classes.quoteContainer}
                    item
                    lg={6}
                    md={6}
                >
                    <div className={classes.quote}>
                    {page === 'login' && (
                        <div className={classes.quoteInner}>
                            <Typography variant="h2" className={classes.quoteHeader}>
                                New here?
                            </Typography>
                            <Typography variant="h5" className={classes.quoteText}>
                                Start your journey with us now.
                            </Typography>
                            
                            <div className={classes.quoteAction}>
                                {/* <Typography className={classes.quoteText} variant="h5">
                                It's free forever
                                </Typography> */}
                                <Link href="/signup">
                                    <a style={{textDecoration:'none'}}>
                                        <Button variant="contained" color="warning">
                                            Sign Up
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                    {page === 'signup' || page === 'volunteer' ? (
                        <div className={classes.quoteInner}>
                            <Typography variant="h2" className={classes.quoteHeader}>
                                Already have an account?
                            </Typography>
                            <Typography variant="h5" className={classes.quoteText}>
                                Login here
                            </Typography>
                            
                            <div className={classes.quoteAction}>
                                <Link href="/login">
                                    <a style={{textDecoration:'none'}}>
                                        <Button variant="contained" color="secondary">
                                            Login
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ) : null }
                    </div>
                </Grid>
                
            </Grid>
        </div>
    )
}

FormLayout.propTypes = {
    page: PropTypes.string.isRequired
}

export default FormLayout
