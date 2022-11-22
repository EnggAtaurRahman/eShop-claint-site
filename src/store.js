import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDtailsReducers } from './reducers/productReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDtailsReducers,
    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware),
        // other store enhancers if any
    ));
export default store;

