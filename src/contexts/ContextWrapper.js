import { AuthContextProvider } from './Auth'
import SessionContextProvider from './SessionContext'
import JournalContextProvider from './JournalContext'
import SelectedUserContextProvider from './SelectedUserContext'
import ChatContextProvider from './ChatContext'
import GroupNameContextProvider  from './groupNameContext'

const ContextWrapper = ({ children }) => {
    return (
        <AuthContextProvider>
            <SessionContextProvider>
                <JournalContextProvider>
                    <SelectedUserContextProvider>
                        <ChatContextProvider>
                            <GroupNameContextProvider>
                                {children}  
                            </GroupNameContextProvider>                            
                        </ChatContextProvider>                        
                    </SelectedUserContextProvider>
                </JournalContextProvider>
            </SessionContextProvider>
        </AuthContextProvider>

    )
}

export default ContextWrapper
