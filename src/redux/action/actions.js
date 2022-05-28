// Redux Actions
// ActionTypes Imports
import * as actionTypes from '../actionTypes/actionTypes';

export const changeCurrency = data => {
  return {
    type: actionTypes.CHANGE_CURRENCY,
    data: data,
  };
};

export const changeCategory = data => {
  return {
    type: actionTypes.CHANGE_CATEGORY,
    data: data,
  };
};
export const changeCart = data => {
  return {
    type: actionTypes.CHANGE_CART_CONDIION,
    data: data,
  };
};

export const addToCart = data => {
  return {
    type: actionTypes.ADD_TO_CART,
    data,
  };
};

export const removeFromCart = data => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    data,
  };
};
export const adjustQty = (data, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      data: data,
      qty: value,
    },
  };
};
