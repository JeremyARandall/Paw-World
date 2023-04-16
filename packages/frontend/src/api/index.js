import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createProduct = (newProduct) => API.post('/products', newProduct);
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (_id) => API.get(`/products/id/${_id}`);

export const createDiscount = (newDiscount) => API.post('/discounts', newDiscount);
export const fetchDiscounts = () => API.get('/discounts');
export const fetchDiscountById = (_id) => API.get(`/discounts/id/${_id}`);

export const createUser = (newUser) => API.post('/users/', newUser);
export const fetchUsers = () => API.get('/users');
export const fetchUserByName = (user) => API.get(`/users/user/${user}`);