
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminProfile.css';

const API_BASE = (import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/api` : '/api');

const authHeaders = () => {
  const token = sessionStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function AdminUpdate() {
  const [id, setId] = useState('');
  const [product, setProduct] = useState(null);
  const [payload, setPayload] = useState({ name: '', price: '', stock: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productsList, setProductsList] = useState([]);

  const update = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!id) { setMessage('Id requerido'); return; }
    setLoading(true);
    try {
      const body = {};
      Object.keys(payload).forEach(k => { if (payload[k] !== '') body[k] = payload[k]; });
      const { data } = await axios.put(`${API_BASE}/products/${id}`, body, { headers: { ...authHeaders() } });
      setMessage(data?.message || 'Producto actualizado');
      setMessageType('success');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Error al actualizar');
      setMessageType('error');
    } finally { setLoading(false); }
  };

  const loadProduct = async () => {
    if (!id) return setMessage('Selecciona un producto');
    setMessage('');
    setLoadingProduct(true);
    try {
      const { data } = await axios.get(`${API_BASE}/products/${id}`);
      const p = data?.product || null;
      setProduct(p);
      if (p) {
        setPayload({
          name: p.name || '',
          price: p.price != null ? String(p.price) : '',
          stock: p.stock != null ? String(p.stock) : '',
          description: p.description || ''
        });
      }
    } catch (err) {
      setMessage(err?.response?.data?.message || 'No se pudo cargar el producto');
      setMessageType('error');
      setProduct(null);
    } finally { setLoadingProduct(false); }
  };

  useEffect(() => {
    // Cargar lista de productos para el select
    let mounted = true;
    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products`);
        const list = Array.isArray(data?.products) ? data.products : (Array.isArray(data) ? data : []);
        if (mounted) setProductsList(list);
      } catch (e) {
        console.error('No se pudo cargar lista de productos', e);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="profile-card-admin">
      <h3>Actualizar producto</h3>
      {message && (
        <div className={messageType === 'success' ? 'profile-success-admin' : (messageType === 'error' ? 'profile-error-admin' : '')}>
          {message}
        </div>
      )}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }}>Producto</label>
        <div style={{ display: 'flex', gap: 8 }}>
          <select value={id} onChange={(e)=>{ setId(e.target.value); }}>
            <option value="">-- Selecciona un producto --</option>
            {productsList.map(p => (
              <option key={p.id} value={p.id}>{p.name} {p.stock != null ? `(${p.stock})` : ''}</option>
            ))}
          </select>
          <button className="btn-secondary-admin" onClick={(e)=>{ e.preventDefault(); loadProduct(); }} disabled={loadingProduct || !id}>{loadingProduct ? 'Cargando...' : 'Cargar'}</button>
        </div>
      </div>

      {product && (
        <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src={product.image_url ? (import.meta.env.VITE_BACKEND_URL ? `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}${product.image_url}` : product.image_url) : '/placeholder-coffee.jpg'} alt={product.name} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }} />
          <div>
            <div style={{ fontWeight: 700 }}>{product.name}</div>
            <div>Precio: ${product.price}</div>
            <div>Stock: {product.stock}</div>
          </div>
        </div>
      )}

      <form onSubmit={update} className="iud-products-admin">

        <label>Nombre</label>
        <input value={payload.name} onChange={(e)=>setPayload({...payload, name: e.target.value})} required />

        <label>Descripción</label>
        <textarea value={payload.description} onChange={(e)=>setPayload({...payload, description: e.target.value})} />

        <label>Precio</label>
        <input type="number" min="0" step="0.01" value={payload.price} onChange={(e)=>setPayload({...payload, price: e.target.value})} required />

        <label>Stock</label>
        <input type="number" min="0" step="1" value={payload.stock} onChange={(e)=>setPayload({...payload, stock: e.target.value})} />

        <button className="btn-primary-admin" disabled={loading}>{loading ? 'Actualizando...' : 'Actualizar'}</button>
      </form>
    </section>
  );
}
