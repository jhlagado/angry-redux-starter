export const authReducer = (state = {}, action) => {
    if (action.type === 'INIT_AUTH') {
        const { auth, authData} = action.payload;
        return {
            ...state,
            auth,
            authData,
        }
    }
    return state;
}