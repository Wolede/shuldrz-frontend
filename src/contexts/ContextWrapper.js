import AuthContextProvider from './AuthContext'

const ContextWrapper = ({children}) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}

export default ContextWrapper
