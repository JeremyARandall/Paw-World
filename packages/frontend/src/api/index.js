import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createProduct = (newProduct) => API.post('/products', newProduct);
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (_id) => API.get(`/products/id/${_id}`);
export const updateProductById = (_id, updated) => API.patch(`/products/id/${_id}`, updated);

export const createOrder = (newOrder) => API.post('/orders', newOrder);
export const fetchOrder = () => API.get('/orders');
export const fetchOrderById = (_id) => API.get(`/orders/id/${_id}`);
export const updateOrderById = (_id, updated) => API.patch(`/orders/id/${_id}`, updated);

export const createDiscount = (newDiscount) => API.post('/discounts', newDiscount);
export const fetchDiscounts = () => API.get('/discounts');
export const fetchDiscountById = (_id) => API.get(`/discounts/id/${_id}`);

export const createUser = (newUser) => API.post('/users/', newUser);
export const fetchUsers = () => API.get('/users');
export const fetchUserByName = (user) => API.get(`/users/user/${user}`);