//Not used anymore, within the Page code itself
import { combineReducers } from 'redux';
import productReducer from './product';


const reducers = combineReducers({
    product: productReducer,
});
export default reducers;