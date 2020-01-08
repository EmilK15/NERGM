const initialState = {
    topbar_navigation: '',
};

const navigationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_TOPBAR_NAVIGATION':
            return Object.assign({}, state, { topbar_navigation: action.payload });
        default:
            return state;
    }
};

export default navigationReducer;