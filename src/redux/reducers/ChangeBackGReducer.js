// Category Reducer
// Handles Stores BackGround Effect
// Initial State
const initialState = {
  isCartOpened: false,
};

export const ChangeBackReducer = (state = initialState, action) => {
  // Switch statements for handling actions when they're called
  switch (action.type) {
    // Change Cart Condition
    case 'CHANGE_CART_CONDIION': {
      return {
        isCartOpened: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
