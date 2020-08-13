import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Drawer, Button } from '@material-ui/core'
import Link from 'next/link'

const Sidebar = props => {
    const { open, variant, onClose, className, ...rest } = props
    const classes = useStyles(props)

    return (
        <Drawer
        anchor="right"
        onClose={onClose}
        open={open}
        variant={variant}
        classes={{ paper: classes.drawer }}
        >
            <div
            {...rest}
            className={classes.root}
            >
                <Link href='/volunteer-signup'>
                    <a style={{textDecoration:'none'}}>
                        <Button activeClassName={classes.active} className={classes.button} size='large'
                        >
                            Become a Buddy
                        </Button>
                    </a>
                </Link>

                {/* <Link href='#'>
                    <a style={{textDecoration:'none'}}>
                        <Button activeClassName={classes.active} className={classes.button} size='large'
                        >
                            Donate
                        </Button>
                    </a>
                </Link> */}

                <Link href='/faq'>
                    <a style={{textDecoration:'none'}}>
                        <Button activeClassName={classes.active} className={classes.button} size='large'
                        >
                            FAQ
                        </Button>
                    </a>
                </Link>

                <Link href='/login'>
                    <a style={{textDecoration:'none'}}>
                        <Button activeClassName={classes.active} className={classes.button} size='large'
                        >
                            Login
                        </Button>
                    </a>
                </Link>

                <Link href='/signup'>
                    <a style={{textDecoration:'none'}}>
                        <Button activeClassName={classes.active} className={classes.button} size='large'
                        color="primary" >
                            Sign Up
                        </Button>
                    </a>
                </Link>

            </div>
        </Drawer>
    )
}

Sidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
}

export default Sidebar