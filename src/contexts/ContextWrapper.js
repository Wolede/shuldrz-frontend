import { AuthContextProvider } from './Auth'
import SessionContextProvider  from './SessionContext'
import JournalContextProvider  from './JournalContext'

const ContextWrapper = ({ children }) => {
    return (
        <AuthContextProvider>
            <SessionContextProvider>
                <JournalContextProvider>
                {children}
                </JournalContextProvider>
            </SessionContextProvider>
        </AuthContextProvider>

    )
}

export default ContextWrapper
