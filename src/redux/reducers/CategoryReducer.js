const initialState = {
    category: 'all'
};

export const CatergoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CATEGORY': {
            return {
                category: action.data
            };
        }
        default: {
            return state;
        }
    }
};
