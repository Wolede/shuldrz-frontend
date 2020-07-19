import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from "next/router";
import { List, ListItem, Button, colors, Typography } from '@material-ui/core';
import { useStyles } from './style';

const SidebarNav = props => {
    const { pages, className, ...rest } = props;
    const classes = useStyles()
    const router = useRouter()

    return (
        <List {...rest}>
            {pages.map(page => (
                <ListItem
                className={classes.item}
                // disableGutters
                key={page.title}
                >
                    <Link href={page.href}>
                        <a style={{ textDecoration: 'none' }}>
                            <Button
                            className={router.pathname == page.href ? classes.activeButton : classes.button}
                            >
                                <div 
                                className={classes.icon}
                                >
                                    {page.icon}
                                </div>
                                <Typography className={classes.menuText}>
                                    {page.title}
                                </Typography>
                            </Button>
                        </a>
                    </Link>
                </ListItem>
            ))
            }
        </List>
    )
}

SidebarNav.propTypes = {
    className: PropTypes.string,
    pages: PropTypes.array.isRequired
}

export default SidebarNav
