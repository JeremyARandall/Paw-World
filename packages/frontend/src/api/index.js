import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProducts = () => API.get('/products');
export const createProduct = (newProduct) => API.post('/products', newProduct);
export const fetchProductById = (_id) => API.get(`/products/id/${_id}`);
export const createUser = (newUser) => API.post('/users/', newUser);
export const fetchUsers = () => API.get('/users');
export const fetchUserByName = (user) => API.get(`/users/user/${user}`)