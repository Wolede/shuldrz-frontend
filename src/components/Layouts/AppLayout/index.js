import { useState } from 'react';
import PropTypes from 'prop-types'
import { useStyles } from './style'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar';
import { useMediaQuery, Hidden, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import Topbar from './Topbar';



const AppLayout = (props) => {
    const { children, withRightSidebar, otherUser } = props
    const classes = useStyles(props)

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openLeftSidebar, setOpenLeftSidebar] = useState(false);
    const [openRightSidebar, setOpenRightSidebar] = useState(false);

    const handleLeftSidebarOpen = () => {
      setOpenLeftSidebar(true);
    };
  
    const handleLeftSidebarClose = () => {
      setOpenLeftSidebar(false);
    };

    const handleRightSidebarOpen = () => {
      setOpenRightSidebar(true);
    };
  
    const handleRightSidebarClose = () => {
      setOpenRightSidebar(false);
    };
  
    const shouldOpenLeftSidebar = isDesktop ? true : openLeftSidebar;
    const shouldOpenRightSidebar = isDesktop ? true : openRightSidebar;

    
    return (
        <div>

            <Hidden lgUp> {/* this hidden component is sweet  */}
                <Topbar 
                onLeftSidebarOpen={handleLeftSidebarOpen} 
                onRightSidebarOpen={handleRightSidebarOpen} 
                withRightSidebar={withRightSidebar}
                />
            </Hidden>

            <LeftSidebar 
            onClose={handleLeftSidebarClose}
            open={shouldOpenLeftSidebar}
            variant={isDesktop ? 'persistent' : 'temporary'}
            />



            <div className={classes.root}>
                <Grid container>
                    <Grid 
                      item 
                      xs={12}
                      md={withRightSidebar ? 12 : 12} 
                      lg={withRightSidebar ? 9 : 11} 
                      xl={withRightSidebar ? 8 : 11} 
                      >

                        {children}

                    </Grid>
                </Grid>
            </div> 

            {withRightSidebar  && (
                <>
                    <RightSidebar 
                    onClose={handleRightSidebarClose}
                    open={shouldOpenRightSidebar}
                    variant={isDesktop ? 'persistent' : 'temporary'}
                    otherUser={otherUser}
                    />
                </>
            )}
                
            
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node,
    withRightSidebar: PropTypes.bool,
    otherUser: PropTypes.string
};
export default AppLayout
