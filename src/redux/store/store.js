import {createStore, applyMiddleware } from "redux"
import { mainReducer } from "../reducers/rootReducers"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const middleware = [thunk]

const store = createStore(mainReducer,composeWithDevTools(applyMiddleware(...middleware)) )

export default store
