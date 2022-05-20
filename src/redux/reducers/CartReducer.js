
import * as actionTypes from "../actionTypes/actionTypes";

const updateCart = (data, attributesdata) => {
    localStorage.setItem("cart", JSON.stringify(data))
    localStorage.setItem("cart-attributes", JSON.stringify(attributesdata))
}


const initialProduct = () => {
    const Getproducts = localStorage.getItem("products");
    let products = []
    if (Getproducts){
        products = JSON.parse(Getproducts)
    }
    return products
}
const initialCart = () => {
    const GetCart = localStorage.getItem("cart");
    let cart = []
    if (GetCart){
        cart = JSON.parse(GetCart)
    }
    return cart
}
const initialAttributes = () => {
    const GetAttributes = localStorage.getItem("cart-attributes");
    let attributes = []
    if (GetAttributes){
        attributes = JSON.parse(GetAttributes)
    }
    return attributes
}

const initialState = {
    products: initialProduct(), //{id, title, description, price, img}
    cart: initialCart(),
    attributes: initialAttributes(),
    currentItem: null
}

export const CartReducer = (state=initialState, action) => {
    updateCart(state.cart, state.attributes)
    switch (action.type) {
        case actionTypes.ADD_PRODUCTS:
            return{
                ...state,
                products : (action.data === state.products) ? state.products : action.data
            }

        case actionTypes.ADD_TO_CART:
            const item = state.products.find(prod => prod.id === action.payload.id)
            const inCart = state.cart.find((item) => item.id === action.payload.id ? true: false)
            return {
                ...state,
                cart: inCart ? state.cart.map(item => item.id === action.payload.id ?{...item, qty: item.qty + 1} : item ) : [...state.cart, {...item, qty: 1}],

            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id),
            }

        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id ?  {...item, qty: action.payload.qty} : item )
            }

        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            }

        case actionTypes.ADD_COLOR_ATTRIBUTE:
            const inColorAttri = state.attributes.find((item) => item.id === action.payload.id ? true: false)
            return{
                ...state,
                attributes: inColorAttri ? state.attributes.map(item=> item.id === action.payload.id ? {...item, colorattr: action.payload.colorattri}: item) : [...state.attributes, {id: action.payload.id, colorattr: action.payload.colorattri}]
            }

        case actionTypes.ADD_TEXT_ATTRIBUTE:
            const inTextAttri = state.attributes.find((item) => item.id === action.payload.id ? true: false)
            return{
                ...state,
                attributes: inTextAttri ?  state.attributes.map(item=> item.id === action.payload.id ? {...item, textattri: action.payload.textattri}:item): [...state.attributes, {id: action.payload.id, textattri: action.payload.textattri}]
            }


        default:
            return state
    }



}

