// update the login user info
const Reducer = (state, action) => {
    switch (action.type) {
        // by default user is set to null
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
            // when user loging is successfull
            case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
            // when login fails
            case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
            
            case "UPDATE_START":
            return {
                ...state,
                isFetching:true,
            };
            // when user loging is successfull
            case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
            // when login fails
            case "UPDATE_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true,
            };
            // logout
            case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            };
            default:{
                return state;
            }
    };
}
export default Reducer;