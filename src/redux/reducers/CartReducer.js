// Cart  Reducer
// Handles our Cart Actions
// Action Types
import * as actionTypes from '../actionTypes/actionTypes';

// Updates Local Storage
const updateCart = data => {
  localStorage.setItem('cart', JSON.stringify(data));
};

// Retrieves State from local storage
const initialCart = () => {
  const GetCart = localStorage.getItem('cart');
  let cart = [];
  if (GetCart) {
    cart = JSON.parse(GetCart);
  }
  return cart;
};

// Evaaluates if our object attributes are equal
const arrayEqual = (a1, a2) => {
  const evaluation = JSON.stringify(a1.map(item => item)) === JSON.stringify(a2.map(item => item));
  return evaluation;
};

// initial Redux Store State
const initialState = {
  cart: initialCart(), // {id, title, description, price, img}
};

// Reducer
export const CartReducer = (state = initialState, action) => {
  // Updates local storage with the stores state
  updateCart(state.cart);
  // Switch statements for handling actions when they're called
  switch (action.type) {
    // Add to cart action
    case actionTypes.ADD_TO_CART:
      const inCart = state.cart.find(item =>
        item.id === action.data.id &&
        arrayEqual(item.selectedAttributes, action.data.selectedAttributes)
          ? true
          : false
      );
      const product = action.data;
      return {
        ...state,
        cart: inCart
          ? state.cart.map(x =>
              x.id === action.data.id &&
              arrayEqual(x.selectedAttributes, action.data.selectedAttributes)
                ? { ...x, qty: x.qty + 1 }
                : x
            )
          : [...state.cart, { ...product, qty: 1 }],
      };
    // Remove To cart Actiom
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item !== action.data),
      };
    // Adjust QTY action
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item === action.payload.data ? { ...item, qty: action.payload.qty } : item
        ),
      };
    default:
      return state;
  }
};
