import { CHANGE_CURRENCY, CHANGE_CATEGORY } from "../actionTypes/actionTypes"

export const changeCurrency = (data) =>{
    return {
        type: CHANGE_CURRENCY,
        data: data
    }
}

export const changeCategory = (data) =>{
    return{
        type: CHANGE_CATEGORY,
        data: data
    }
}