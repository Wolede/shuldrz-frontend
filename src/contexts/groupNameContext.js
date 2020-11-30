import React, { useState, createContext } from 'react'

export const GroupNameContext = createContext();

const GroupNameContextProvider = ({ children }) => {
    const [groupName, setGroupName] = useState({text:'', updated: false})    
    
    return (
        <GroupNameContext.Provider value={[groupName, setGroupName]}>
            { children }
        </GroupNameContext.Provider>
    )
}

export default GroupNameContextProvider