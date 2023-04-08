import { createContext, useReducer } from "react";

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
                    item._id === existItem._id ? new item : item
                )
                : [...state.cart.cartItems, newItem]
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: [...state.cart.cartItems, action.payload], //adding item to cart to previous items
                },
            }; //return previous state, then the cart from the state with all items in the cart in that state followed by new item which is retrieved in action payload
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}> {props.children}</Store.Provider>
}