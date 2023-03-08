import axios from 'axios';

const url = 'http://localhost:5000/product';

export const fetchProduct = () => axios.get(url);
export const createProduct = (newProduct) => axios.post(url, newProduct);