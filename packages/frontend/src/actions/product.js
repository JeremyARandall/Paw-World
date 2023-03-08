import * as api from '../api';

export const getProduct = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProduct();
        dispatch({ type: 'FETCH_ALL', payload: data })
    } catch (error) {
        console.log(error.message);
    }

}