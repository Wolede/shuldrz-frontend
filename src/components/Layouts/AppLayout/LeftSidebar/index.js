import PropTypes from 'prop-types'
import { useStyles } from './style'
import { Drawer } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard';
import SidebarNav from './SidebarNav';
import Logout from 'components/Logout'
import useAuth from 'contexts/Auth'
import SponsoredAdBox from '../../../SponsoredAdBox';
import { Home, MessageSquare, Clipboard, MessageCircle, Users } from 'react-feather';

const LeftSidebar = props => {
    const { open, variant, onClose, className, ...rest } = props
    const classes = useStyles(props)
    const { user } = useAuth();

    // If user is a Volunteer 
    const pages = user?.userType === "Volunteer" ? [
        {
          title: 'Home',
          href: '/app',
          icon: <Home />
        },
        {
          title: 'Wall',
          href: '/app/wall',
          icon: <Home />
        },
        {
          title: 'Buddies',
          href: '/app/buddies',
          icon: <Users />
        },
        {
          title: 'Sessions',
          href: '/app/sessions',
          icon: <MessageCircle />
        },
        {
          title: 'Trainings',
          href: '/app/trainings',
          icon: <Clipboard />
        },
        {
          title: 'Reviews',
          href: '/app/reviews',
          icon: <MessageSquare />
        },
    ] : [
       {
        title: 'Home',
        href: '/app',
        icon: <Home />
       },
       {
        title: 'Wall',
        href: '/app/wall',
        icon: <Home />
       },
       {
        title: 'Buddies',
        href: '/app/buddies',
        icon: <Users />
       },
       {
        title: 'Sessions',
        href: '/app/sessions',
        icon: <MessageCircle />
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
                <SponsoredAdBox />
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
