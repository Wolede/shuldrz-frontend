import React, { createContext, useState } from 'react';

export const SelectedUserContext = createContext();

const SelectedUserContextProvider = ({ children }) => {
    const [ selectedUser, setSelectedUser ] = useState()
    // console.log(selectedUser, 'incontext');
    
    return (
        <SelectedUserContext.Provider value={[selectedUser, setSelectedUser]}>
            { children }
        </SelectedUserContext.Provider>
    )
}

export default SelectedUserContextProvider
