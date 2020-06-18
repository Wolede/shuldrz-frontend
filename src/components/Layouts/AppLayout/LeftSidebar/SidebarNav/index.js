import PropTypes from 'prop-types'
import Link from 'next/link'
import { List, ListItem, Button, colors } from '@material-ui/core';
import { useStyles } from './style';

const SidebarNav = props => {
    const { pages, className, ...rest } = props;
    const classes = useStyles()
    return (
        <List {...rest}>
            {pages.map(page => (
                <ListItem
                className={classes.item}
                // disableGutters
                key={page.title}
                >
                    <Link href={page.href}>
                        <a>
                            <Button
                            // activeClassName={classes.active}
                            className={classes.button}
                            >
                                <div 
                                className={classes.icon}
                                >
                                    {page.icon}
                                </div>
                                {page.title}
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
