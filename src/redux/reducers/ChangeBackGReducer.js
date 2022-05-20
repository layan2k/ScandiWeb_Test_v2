const initialState = {
    isCartOpened: false
};

export const ChangeBackReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CART_CONDIION': {
            return {
                isCartOpened: action.data
            };
        }
        default: {
            return state;
        }
    }
};
