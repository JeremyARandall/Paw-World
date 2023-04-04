import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const fetchProductById = (_id) => API.get(`/products/id/${_id}`);