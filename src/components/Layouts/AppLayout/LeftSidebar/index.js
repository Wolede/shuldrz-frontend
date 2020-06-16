import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Drawer } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard';
import SidebarNav from './SidebarNav';
import Logout from 'components/Logout'


const LeftSidebar = props => {
    const { open, variant, onClose, className, ...rest } = props
    const classes = useStyles(props)

    const pages = [
        {
          title: 'Home',
          href: '/app',
          icon: <DashboardIcon />
        },
        {
          title: 'Sessions',
          href: '/app/sessions',
          icon: <DashboardIcon />
        },
        {
          title: 'Trainings',
          href: '/app/trainings',
          icon: <DashboardIcon />
        },
        {
          title: 'Reviews',
          href: '/app/reviews',
          icon: <DashboardIcon />
        },
    ];

    return (
        <Drawer
        anchor="left"
        onClose={onClose}
        open={open}
        variant={variant}
        classes={{ paper: classes.drawer }}
        >
            <div
            {...rest}
            className={classes.root}
            >
                <SidebarNav
                className={classes.nav}
                pages={pages}
                />
                <Logout/>
            </div>
        </Drawer>
    )
}

LeftSidebar.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired
}

export default LeftSidebar
