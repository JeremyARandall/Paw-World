import { createContext, useReducer } from "react";
import logger from "use-reducer-logger";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: [],
    },
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
                : [...state.cart.cartItems, newItem]
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: [...state.cart.cartItems, action.payload], //adding item to cart to previous items
                },
            }; //return previous state, then the cart from the state with all items in the cart in that state followed by new item which is retrieved in action payload
        case 'REMOVE_FROM_CART': {
            const cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload._id
            ); //filter out the items from the cart that match the payload
            return { ...state, cart: { ...state.cart, cartItems } }; //return the existing state, update cart for state to have items not filtered out
        }
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(logger(reducer), initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}> {props.children}</Store.Provider>
}