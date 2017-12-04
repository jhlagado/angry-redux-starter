export const authReducer = (state = {}, action) => {

    const reducers = {

        AUTH_STORE_DATA() {
            const { authData} = action.payload;
            return {
                ...state,
                authData,
            }
        },
    }

    return action.type in reducers ? reducers[action.type]() : state;
}