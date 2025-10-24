import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const products = {
  getAll: () => api.get('/products'),
  add: (product) => api.post('/products', product),
  updateStock: (productId, quantity) => 
    api.put(`/products/${productId}/stock`, { product_id: productId, quantity }),
};

export const categories = {
  getAll: () => api.get('/categories'),
  add: (category) => api.post('/categories', category),
  update: (categoryId, category) => api.put(`/categories/${categoryId}`, category),
  delete: (categoryId) => api.delete(`/categories/${categoryId}`),
};

export const suppliers = {
  getAll: () => api.get('/suppliers'),
  add: (supplier) => api.post('/suppliers', supplier),
  update: (supplierId, supplier) => api.put(`/suppliers/${supplierId}`, supplier),
  delete: (supplierId) => api.delete(`/suppliers/${supplierId}`),
};

export const sales = {
  getAll: (limit = 50) => api.get(`/sales?limit=${limit}`),
  getDetails: (saleId) => api.get(`/sales/${saleId}`),
  create: (sale) => api.post('/sales', sale),
};

export const customers = {
  getAll: () => api.get('/customers'),
  add: (customer) => api.post('/customers', customer),
};

export const employees = {
  getAll: () => api.get('/employees'),
  add: (employee) => api.post('/employees', employee),
};

export const dashboard = {
  getStats: () => api.get('/dashboard/stats'),
};

export const reports = {
  getSalesByDate: (days = 7) => api.get(`/reports/sales-by-date?days=${days}`),
  getCategorySales: () => api.get('/reports/category-sales'),
  getTopProducts: (limit = 5) => api.get(`/reports/top-products?limit=${limit}`),
};

export const notifications = {
  getAll: () => api.get('/notifications'),
  update: (notificationId, status) => api.put(`/notifications/${notificationId}`, { status }),
};

export const purchaseOrders = {
  getAll: () => api.get('/purchase-orders'),
  getDetails: (orderId) => api.get(`/purchase-orders/${orderId}`),
  create: (order) => api.post('/purchase-orders', order),
  receive: (orderId) => api.put(`/purchase-orders/${orderId}/receive`),
};

export default api;
