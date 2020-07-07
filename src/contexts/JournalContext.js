import React, { useState, createContext } from 'react'

export const JournalContext = createContext();

const JournalContextProvider = ({ children }) => {
    const [ journal, setJournal ] = useState()
    console.log(journal, 'incontext');
    
    return (
        <JournalContext.Provider value={[journal, setJournal]}>
            { children }
        </JournalContext.Provider>
    )
}

export default JournalContextProvider
