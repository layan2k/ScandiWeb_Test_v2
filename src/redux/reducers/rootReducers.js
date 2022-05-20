import { combineReducers } from 'redux';
import { CartReducer } from './CartReducer';
import { CatergoryReducer } from './CategoryReducer';
import { ChangeBackReducer } from './ChangeBackGReducer';
import { CurrencyReducer } from './CurrencyReducer';

export const mainReducer = combineReducers({
    currency: CurrencyReducer,
    category: CatergoryReducer,
    shop: CartReducer,
    isCartCondition: ChangeBackReducer
});
