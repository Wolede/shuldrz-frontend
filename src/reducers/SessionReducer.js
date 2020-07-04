export const SessionReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return {
                ...state,
                chats: action.chats,
            }        
        default:
            return state
    }
}