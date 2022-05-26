// Category Reducer
// Handles Stores Categories
// Initial State
const initialState = {
  category: 'all',
};

// Category Reducer
export const CatergoryReducer = (state = initialState, action) => {
  // Switch statements for handling actions when they're called
  switch (action.type) {
    // Change Category
    case 'CHANGE_CATEGORY': {
      return {
        category: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
