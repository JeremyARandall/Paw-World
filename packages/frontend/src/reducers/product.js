// eslint-disable-next-line import/no-anonymous-default-export
const productReducer = (product = [], action) => {
    switch(action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return product;
        default:
            return product;

    }
}

export default productReducer;