import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function ProductManagement() {
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('products')) || []);
  
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <section>
      <h2 className='target'>Product Management</h2>
      <Link to="add">
        <button>Add New Product</button>
      </Link>
      <Routes>
        <Route path="/" element={<ProductList products={products} setProducts={setProducts} />} />
        <Route path="add" element={<ProductForm setProducts={setProducts} />} />
        <Route path="edit/:index" element={<ProductForm products={products} setProducts={setProducts} />} />
      </Routes>
    </section>
  );
}

function ProductList({ products, setProducts }) {
  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>
              <Link to={`edit/${index}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProductForm({ products = [], setProducts }) {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const index = window.location.pathname.split('/').pop();
    if (index !== 'add' && products.length > 0) {
      setEditingIndex(index);
      setFormData(products[index]);
    }
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = formData;
      setProducts(updatedProducts);
    } else {
      setProducts([...products, formData]);
    }
    navigate("/dashboard/products");
    setFormData({ name: '', description: '', price: '', quantity: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
        required
      />
      <button type="submit">{editingIndex !== null ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
}

export default ProductManagement;