import { createContext, useReducer } from "react";
import logger from "use-reducer-logger";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
    },
    userInfo: localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) :
        null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem = action.payload; //takes the product from the payload and creates item
            const existItem = state.cart.cartItems.find( //checks to see if this is in the cart yet, if not it gets added
                (item) => item._id === newItem._id
            );
            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item._id === existItem._id ? newItem : item
                )
                : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } }; //return previous state, then the cart from the state with all items in the cart in that state followed by new item which is retrieved in action payload
        case 'REMOVE_FROM_CART': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            ); //filter out the items from the cart that match the payload. returns all items from state not matching id to cartItems
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } }; //return the existing state, update cart for state to have items not filtered out
        }
        case 'USER_LOGIN':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return { ...state, userInfo: null }
        case 'CLEAR_CART_STOCK':
            return { ...state, cart: { ...state.cart, cartItems: [], total: 0, tax: 0, subtotal: 0 } };
        case 'APPLY_DISCOUNT':
            const p = action.payload;
            const newSub = Math.round(((p.subtotal * (100 - p.percent) / 100) + Number.EPSILON) * 100) / 100;
            const newTax = Math.round((newSub * 0.0825 + Number.EPSILON) * 100) / 100;
            const newTotal = newTax + newSub;
            return { ...state, cart: { ...state.cart, subtotal: newSub, tax: newTax, total: newTotal, } };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(logger(reducer), initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}> {props.children}</Store.Provider>
}