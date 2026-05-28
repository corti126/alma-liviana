import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { getById, getCategories } from '../../data/products.js';
import './Admin.css';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? getById(id) : null;
  const [form, setForm] = useState(
    existing || {
      name: '',
      description: '',
      category: 'Básicas',
      price: 0,
      stock: 0,
      image: '',
      featured: false,
      active: true,
    }
  );
  const [saved, setSaved] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to firebase/products.js
    setSaved(true);
    setTimeout(() => navigate('/admin/products'), 900);
  };

  const categories = getCategories().filter((c) => c !== 'Todas');

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <span className="eyebrow">{existing ? 'Editar' : 'Crear'}</span>
          <h1>{existing ? existing.name : 'Nuevo producto'}</h1>
          <p>Completa los datos de la prenda. Los cambios serán visibles en la tienda.</p>
        </div>
      </header>

      <form className="admin__form" onSubmit={onSubmit}>
        <div className="admin__form-grid">
          <div>
            <Input label="Nombre" name="name" value={form.name} onChange={onChange} required />
            <Input as="textarea" label="Descripción" name="description" value={form.description} onChange={onChange} />
            <label className="field">
              <span className="field__label">Categoría</span>
              <select className="field__input" name="category" value={form.category} onChange={onChange}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <Input label="Precio (COP)" name="price" type="number" value={form.price} onChange={onChange} required />
            <Input label="Stock" name="stock" type="number" value={form.stock} onChange={onChange} required />
          </div>
          <div>
            <Input label="URL de la imagen" name="image" value={form.image} onChange={onChange} placeholder="https://…" />
            <div className="admin__image-preview">
              {form.image
                ? <img src={form.image} alt="Vista previa" />
                : <div className="admin__image-placeholder">Sube o pega la URL de la imagen</div>}
            </div>
            <div className="admin__toggles">
              <label className="switch-row">
                <input type="checkbox" name="featured" checked={!!form.featured} onChange={onChange} />
                <span>Marcar como destacado</span>
              </label>
              <label className="switch-row">
                <input type="checkbox" name="active" checked={!!form.active} onChange={onChange} />
                <span>Producto activo en la tienda</span>
              </label>
            </div>
          </div>
        </div>

        <div className="admin__form-actions">
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')}>Cancelar</Button>
          <Button type="submit" variant="primary">{saved ? '✓ Guardado' : 'Guardar producto'}</Button>
        </div>
      </form>
    </div>
  );
}
