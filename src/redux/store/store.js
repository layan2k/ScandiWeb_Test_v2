import { combineReducers, createStore } from "redux"
import { CatergoryReducer } from "../reducers/CategoryReducer"
import { CurrencyReducer } from "../reducers/CurrencyReducer"


const reducer = combineReducers({
    currency : CurrencyReducer,
    category: CatergoryReducer,
})
const initialState = {}

const store = createStore(reducer, initialState)

export default store
