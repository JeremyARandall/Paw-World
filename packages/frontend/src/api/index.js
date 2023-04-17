import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const createUser = (newUser) => API.post('/users/', newUser);
export const fetchUsers = () => API.get('/users');
export const fetchUserById = (_id) => API.get(`/users/id/${_id}`);
export const updateUserById = (_id, updated) => API.patch(`/users/id/${_id}`, updated);
export const deleteUserById = (_id) => API.delete(`/users/id/${_id}`);

export const createProduct = (newProduct) => API.post('/products', newProduct);
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (_id) => API.get(`/products/id/${_id}`);
export const updateProductById = (_id, updated) => API.patch(`/products/id/${_id}`, updated);
export const deleteProductById = (_id) => API.delete(`/products/id/${_id}`);

export const createOrder = (newOrder) => API.post('/orders', newOrder);
export const fetchOrders = () => API.get('/orders');
export const fetchOrderById = (_id) => API.get(`/orders/id/${_id}`);
export const updateOrderById = (_id, updated) => API.patch(`/orders/id/${_id}`, updated);
export const deleteOrderById = (_id) => API.delete(`/orders/id/${_id}`);

export const createDiscount = (newDiscount) => API.post('/discounts', newDiscount);
export const fetchDiscounts = () => API.get('/discounts');
export const fetchDiscountById = (_id) => API.get(`/discounts/id/${_id}`);
export const updateDiscountById = (_id, updated) => API.patch(`/discounts/id/${_id}`, updated);
export const deleteDiscountById = (_id) => API.delete(`/discounts/id/${_id}`);