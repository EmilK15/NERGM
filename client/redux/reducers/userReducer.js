const initialState = {
    _id: '',
    role: '',
    email: '',
    fName: '',
    lName: '',
    userLoading: false,
    userError: false,
    registerSuccess: false,
    userUpdateSuccess: false,
    userUpdateFail: false,
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_USER':
            return Object.assign({}, state, {
                _id: action.payload._id,
                role: action.payload.role,
                email: action.payload.email,
                fName: action.payload.fName,
                lName: action.payload.lName,
                userLoading: false
            });
        //normalize singleUpdates into one reducer case
        case 'UPDATE_SINGLE_VALUE':
            return Object.assign({}, state, {
                [action.payload.key]: action.payload.value
            });
        case 'RESET_USER':
            return Object.assign(state, initialState);
        default:
            return state;
    }
};

export default userReducer;