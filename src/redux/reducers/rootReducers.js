import { combineReducers } from "redux";
import { CartReducer } from "./CartReducer";
import { CatergoryReducer } from "./CategoryReducer";
import { CurrencyReducer } from "./CurrencyReducer";

export const mainReducer = combineReducers({
    currency : CurrencyReducer,
    category: CatergoryReducer,
    shop: CartReducer,
})