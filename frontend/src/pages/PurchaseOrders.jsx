import { useState, useEffect } from 'react';
import { purchaseOrders, suppliers, products as productsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/PurchaseOrders.css';

function PurchaseOrders() {
  const { user } = useAuth();
  const [orderList, setOrderList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [formData, setFormData] = useState({
    supplier_id: '',
    items: [{ product_id: '', quantity: '', unit_price: '' }],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [ordersRes, suppliersRes, productsRes] = await Promise.all([
        purchaseOrders.getAll(),
        suppliers.getAll(),
        productsApi.getAll(),
      ]);
      setOrderList(ordersRes.data.purchase_orders);
      setSupplierList(suppliersRes.data.suppliers);
      setProductList(productsRes.data.products);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await purchaseOrders.create({
        supplier_id: parseInt(formData.supplier_id),
        items: formData.items.map(item => ({
          product_id: parseInt(item.product_id),
          quantity: parseInt(item.quantity),
          unit_price: parseFloat(item.unit_price),
        })),
      });
      alert('Purchase order created successfully!');
      resetForm();
      loadData();
    } catch (error) {
      alert('Failed to create purchase order: ' + (error.response?.data?.detail || error.message));
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { product_id: '', quantity: '', unit_price: '' }],
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const viewOrderDetails = async (order) => {
    try {
      const res = await purchaseOrders.getDetails(order.order_id);
      setOrderItems(res.data.items);
      setSelectedOrder(order);
    } catch (error) {
      alert('Failed to load order details: ' + (error.response?.data?.detail || error.message));
    }
  };

  const receiveOrder = async (orderId) => {
    if (!window.confirm('Mark this order as received and update stock?')) return;
    try {
      await purchaseOrders.receive(orderId);
      alert('Order received and stock updated successfully!');
      setSelectedOrder(null);
      loadData();
    } catch (error) {
      alert('Failed to receive order: ' + (error.response?.data?.detail || error.message));
    }
  };

  const resetForm = () => {
    setFormData({ supplier_id: '', items: [{ product_id: '', quantity: '', unit_price: '' }] });
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Loading purchase orders...</div>;
  }

  return (
    <div className="purchase-orders-page">
      <div className="page-header">
        <h1>📋 Purchase Orders</h1>
        {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Create Order
          </button>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <h2>Create Purchase Order</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Supplier *</label>
                <select
                  value={formData.supplier_id}
                  onChange={(e) => setFormData({ ...formData, supplier_id: e.target.value })}
                  required
                >
                  <option value="">Select Supplier</option>
                  {supplierList.map((supplier) => (
                    <option key={supplier.supplier_id} value={supplier.supplier_id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="items-section">
                <h3>Order Items</h3>
                {formData.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <select
                      value={item.product_id}
                      onChange={(e) => updateItem(index, 'product_id', e.target.value)}
                      required
                    >
                      <option value="">Select Product</option>
                      {productList.map((product) => (
                        <option key={product.product_id} value={product.product_id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      required
                      min="1"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Unit Price"
                      value={item.unit_price}
                      onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                      required
                      min="0"
                    />
                    {formData.items.length > 1 && (
                      <button type="button" className="btn-remove" onClick={() => removeItem(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn-add-item" onClick={addItem}>
                  + Add Item
                </button>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Order Details - #{selectedOrder.order_id}</h2>
            <p><strong>Supplier:</strong> {selectedOrder.supplier_name}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>
            
            <h3>Items</h3>
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.unit_price.toFixed(2)}</td>
                    <td>₹{(item.quantity * item.unit_price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
              {selectedOrder.status === 'PENDING' && (user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
                <button type="button" className="btn-primary" onClick={() => receiveOrder(selectedOrder.order_id)}>
                  Mark as Received
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.order_id}>
                <td>#{order.order_id}</td>
                <td>{order.supplier_name}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="btn-view" onClick={() => viewOrderDetails(order)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PurchaseOrders;
