import * as actionTypes from '../actionTypes/actionTypes';

export const changeCurrency = (data) => {
    return {
        type: actionTypes.CHANGE_CURRENCY,
        data: data
    };
};

export const changeCategory = (data) => {
    return {
        type: actionTypes.CHANGE_CATEGORY,
        data: data
    };
};
export const changeCart = (data) => {
    return {
        type: actionTypes.CHANGE_CART_CONDIION,
        data: data
    };
};

export const addToCart = (itemID) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemID
        }
    };
};

export const addProducts = (data) => {
    return {
        type: actionTypes.ADD_PRODUCTS,
        data
    };
};

export const removeFromCart = (itemID) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: itemID
        }
    };
};
export const adjustQty = (itemID, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            id: itemID,
            qty: value
        }
    };
};
export const addColorAttri = (itemID, value) => {
    return {
        type: actionTypes.ADD_COLOR_ATTRIBUTE,
        payload: {
            id: itemID,
            colorattri: value
        }
    };
};

export const addTextAttri = (itemID, value) => {
    return {
        type: actionTypes.ADD_TEXT_ATTRIBUTE,
        payload: {
            id: itemID,
            textattri: value
        }
    };
};

export const loadCurrentItem = (item) => {
    return {
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item
    };
};
