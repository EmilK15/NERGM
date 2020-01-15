export const user_error = (bool) => {
    return {
        type: 'UPDATE_SINGLE_VALUE',
        payload: {
            key: 'userError',
            value: bool
        }
    }
};

export const user_loading = (bool) => {
    return {
        type: 'UPDATE_SINGLE_VALUE',
        payload: {
            key: 'userLoading',
            value: bool
        }
    }
};

export const get_user = (user) => {
    return {
        type: "GET_USER",
        payload: user
    }
};

export const reset_user = () => {
    return {
        type: "RESET_USER"
    }
};

export const register_error = (bool) => {
    return {
        type: "UPDATE_SINGLE_VALUE",
        payload: {
            key: 'registerError',
            value: bool
        }
    }
};

export const register_success = (bool) => {
    return {
        type: "UPDATE_SINGLE_VALUE",
        payload: {
            key: 'registerSuccess',
            value: bool
        }
    }
};

export const user_update_success = (bool) => {
    return {
        type: "UPDATE_SINGLE_VALUE",
        payload: {
            key: 'userUpdateSuccess',
            value: bool
        }
    }
};

export const user_update_fail = (bool) => {
    return {
        type: "UPDATE_SINGLE_VALUE",
        payload: {
            key: 'userUpdateFail',
            value: bool
        }
    }
};