import { AuthContextProvider } from './Auth'
import SessionContextProvider from './SessionContext'
import JournalContextProvider from './JournalContext'
import SelectedUserContextProvider from './SelectedUserContext'
import ChatContextProvider from './ChatContext'

const ContextWrapper = ({ children }) => {
    return (
        <AuthContextProvider>
            <SessionContextProvider>
                <JournalContextProvider>
                    <SelectedUserContextProvider>
                        <ChatContextProvider>
                            {children}
                        </ChatContextProvider>                        
                    </SelectedUserContextProvider>
                </JournalContextProvider>
            </SessionContextProvider>
        </AuthContextProvider>

    )
}

export default ContextWrapper
