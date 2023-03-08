import { combineReducers } from 'redux';
import productReducer from './product';


export default combineReducers({
    product: productReducer,
});