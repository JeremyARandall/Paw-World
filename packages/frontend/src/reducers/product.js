// eslint-disable-next-line import/no-anonymous-default-export
//no longer used, edited to be in ProductPage and Products
import { FETCH_ALL, CREATE, } from '../constants/actionTypes';

const productReducer = (products = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...products, action.payload];
        default:
            return products;

    }
}

export default productReducer;