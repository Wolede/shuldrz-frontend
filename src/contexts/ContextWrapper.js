import { AuthContextProvider } from './Auth'

const ContextWrapper = ({children}) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}

export default ContextWrapper
