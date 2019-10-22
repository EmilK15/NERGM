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