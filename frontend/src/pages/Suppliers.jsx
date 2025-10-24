import { useState, useEffect } from 'react';
import { suppliers } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Suppliers.css';

function Suppliers() {
  const { user } = useAuth();
  const [supplierList, setSupplierList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const res = await suppliers.getAll();
      setSupplierList(res.data.suppliers);
    } catch (error) {
      console.error('Failed to load suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await suppliers.update(currentSupplier.supplier_id, formData);
        alert('Supplier updated successfully!');
      } else {
        await suppliers.add(formData);
        alert('Supplier added successfully!');
      }
      resetForm();
      loadSuppliers();
    } catch (error) {
      alert('Operation failed: ' + (error.response?.data?.detail || error.message));
    }
  };

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      phone: supplier.phone || '',
      email: supplier.email || '',
      address: supplier.address || '',
    });
    setCurrentSupplier(supplier);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (supplierId) => {
    if (!window.confirm('Are you sure you want to delete this supplier?')) return;
    try {
      await suppliers.delete(supplierId);
      alert('Supplier deleted successfully!');
      loadSuppliers();
    } catch (error) {
      alert('Failed to delete supplier: ' + (error.response?.data?.detail || error.message));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', phone: '', email: '', address: '' });
    setShowForm(false);
    setEditMode(false);
    setCurrentSupplier(null);
  };

  if (loading) {
    return <div className="loading">Loading suppliers...</div>;
  }

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <h1>🏭 Suppliers</h1>
        {user?.role === 'ADMIN' && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Add Supplier
          </button>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editMode ? 'Edit Supplier' : 'Add New Supplier'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editMode ? 'Update' : 'Add'} Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="suppliers-grid">
        {supplierList.map((supplier) => (
          <div key={supplier.supplier_id} className="supplier-card">
            <div className="supplier-header">
              <h3>{supplier.name}</h3>
              <div className="reliability-badge">
                Score: {supplier.reliability_score || 100}
              </div>
            </div>
            <div className="supplier-details">
              <p><strong>Phone:</strong> {supplier.phone || 'N/A'}</p>
              <p><strong>Email:</strong> {supplier.email || 'N/A'}</p>
              <p><strong>Address:</strong> {supplier.address || 'N/A'}</p>
            </div>
            {user?.role === 'ADMIN' && (
              <div className="supplier-actions">
                <button className="btn-edit" onClick={() => handleEdit(supplier)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(supplier.supplier_id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suppliers;
