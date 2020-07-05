import { AuthContextProvider } from './Auth'
import SessionContextProvider  from './SessionContext'

const ContextWrapper = ({ children }) => {
    return (
        <AuthContextProvider>
            <SessionContextProvider>
                {children}
            </SessionContextProvider>
        </AuthContextProvider>

    )
}

export default ContextWrapper
