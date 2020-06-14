import { useState } from 'react';
import PropTypes from 'prop-types'
import { useStyles } from './style'
import Sidebar from './Sidebar'
import ProfileBox from './ProfileBox'
import CharityBox from './CharityBox'
import UpcomingBox from './UpcomingBox'
import { useMediaQuery, Hidden, IconButton, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from 'components/Paper'

const AppLayout = (props) => {
    const { children, withRightSidebar } = props
    const classes = useStyles(props)

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
      setOpenSidebar(true);
    };
  
    const handleSidebarClose = () => {
      setOpenSidebar(false);
    };
  
    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    
    return (
        <div>
            <Hidden lgUp> {/* //this Hidden component is sweet o! */}
                <IconButton
                    color="inherit"
                    onClick={handleSidebarOpen}
                >
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Sidebar 
            onClose={handleSidebarClose}
            open={shouldOpenSidebar}
            variant={isDesktop ? 'persistent' : 'temporary'}
            />



            <div className={classes.root}>
                <Grid container spacing={4}>
                    <Grid 
                      item 
                      lg={withRightSidebar ? 9 : 11} 
                      md={withRightSidebar ? 9 : 11} 
                      xl={withRightSidebar ? 9 : 11} 
                      xs={12}
                      >

                        {children}

                    </Grid>

                    {withRightSidebar  && (
                        <Grid item lg={3} md={3} xl={3} xs={12}>
                        <Paper>
                            Right side!
                        </Paper>
                    </Grid>
                    )}
                </Grid>
            </div> 
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node,
    withRightSidebar: PropTypes.bool
};
export default AppLayout
