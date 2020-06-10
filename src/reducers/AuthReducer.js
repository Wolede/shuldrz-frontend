export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_AUTH':
            return {
                ...state,
                isAuthenticated : action.auth.isAuthenticated,
                token : action.auth.token,
                isSuccessful: action.auth.isSuccessful,
                user: action.auth.user
            }
        case 'ERROR_AUTH':
            return {
                ...state,
                isSuccessful: false
            }
        // case 'USER':
        //     return {
        //         ...state,
                
        //     }
        case 'REMOVE_USER':
            return {
                ...state,
                isAuthenticated: false,
                token: '',
                user: {}
            }
        default:
            return state
    }
}