
// take user credentials and start login
export const LoginStart = (userCredentials) =>({
    type: "LOGIN_START",
});

// if
export const LoginSuccess = (user)=> ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () =>({
    type:"LOGIN_FAILURE",
});

export const Logout = () =>({
    type:"LOGOUT",
});

//update start
export const UpdateStart = (userCredentials) =>({
    type: "UPDATE_START",
});

// update success
export const UpdateSuccess = (user)=> ({
    type: "UPDATE_SUCCESS",
    payload: user,
});
//update failure
export const UpdateFailure = () =>({
    type:"UPDATE_FAILURE",
});