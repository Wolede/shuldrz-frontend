import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { useStyles } from './style'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const MainLayout = props => {
    const { children, withFooter, isLight } = props
    const classes = useStyles()

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
      setOpenSidebar(true);
    };
  
    const handleSidebarClose = () => {
      setOpenSidebar(false);
    };

    return (
        <>
            <Header 
                onSidebarOpen={handleSidebarOpen}
                isLight={isLight}
            />

            <main>
                {children}
            </main>

            {withFooter  && (
                <>
                    <Footer/>
                </>
            )}
            <Sidebar
                onClose={handleSidebarClose}
                open={openSidebar}
                variant="temporary"
            />
        </>
    )
}

MainLayout.propTypes = {
    withFooter: PropTypes.bool,
    isLight: PropTypes.bool
}

export default MainLayout
