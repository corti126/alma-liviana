import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import {
  getProduct,
  createProduct,
  updateProduct,
} from '../../firebase/products.js';
import { uploadProductImage } from '../../firebase/storage.js';
import './Admin.css';

const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];
const CATEGORIES = ['Simples', "Oversized", "Con diseño"];

const emptyForm = {
  name: '',
  description: '',
  category: '',
  price: 0,
  image: '',
  featured: false,
  active: true,
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  // Per-size editor state: { S: { enabled, stock }, ... }
  const [sizeRows, setSizeRows] = useState(
    DEFAULT_SIZES.reduce((acc, s) => ({ ...acc, [s]: { enabled: true, stock: 0 } }), {})
  );
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let active = true;
    (async () => {
      try {
        const p = await getProduct(id);
        if (!active || !p) {
          setLoading(false);
          return;
        }
        setForm({
          name: p.name || '',
          description: p.description || '',
          category: p.category || 't-shirts',
          price: p.price || 0,
          image: p.image || '',
          featured: !!p.featured,
          active: p.active !== false,
        });
        const stock = p.sizesStock || {};
        const sizes = p.sizes || [];
        setSizeRows(
          DEFAULT_SIZES.reduce((acc, s) => {
            acc[s] = {
              enabled: sizes.includes(s),
              stock: Number(stock[s] || 0),
            };
            return acc;
          }, {})
        );
      } catch {
        if (active) setError('No pudimos cargar este producto.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const toggleSize = (s) =>
    setSizeRows((r) => ({ ...r, [s]: { ...r[s], enabled: !r[s].enabled } }));

  const changeStock = (s, value) =>
    setSizeRows((r) => ({ ...r, [s]: { ...r[s], stock: Math.max(0, Number(value) || 0) } }));

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadProductImage(file, id || 'new');
      setForm((f) => ({ ...f, image: url }));
    } catch {
      setError('No pudimos subir la imagen. Puedes pegar una URL en su lugar.');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const sizes = DEFAULT_SIZES.filter((s) => sizeRows[s].enabled);
    if (sizes.length === 0) {
      setError('Selecciona al menos un talle.');
      return;
    }
    const sizesStock = sizes.reduce((acc, s) => ({ ...acc, [s]: Number(sizeRows[s].stock) }), {});

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      price: Number(form.price),
      image: form.image.trim(),
      featured: !!form.featured,
      active: !!form.active,
      sizes,
      sizesStock,
    };

    setSaving(true);
    try {
      if (id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate('/admin/products');
    } catch {
      setError('No pudimos guardar el producto. Revisa la conexión con Firebase.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin" style={{ display: 'grid', placeItems: 'center', minHeight: '40vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="admin">
      <header className="admin__header">
        <div>
          <span className="eyebrow">{id ? 'Editar' : 'Crear'}</span>
          <h1>{id ? form.name || 'Editar producto' : 'Nuevo producto'}</h1>
          <p>Completa los datos de la prenda. Los cambios se guardan en Firestore.</p>
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
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <Input label="Precio (COP)" name="price" type="number" value={form.price} onChange={onChange} required />

            <div className="admin__sizes">
              <span className="field__label">Talles y stock</span>
              <div className="admin__sizes-grid">
                {DEFAULT_SIZES.map((s) => (
                  <div key={s} className={`admin__size-row ${sizeRows[s].enabled ? '' : 'is-disabled'}`}>
                    <label className="switch-row">
                      <input type="checkbox" checked={sizeRows[s].enabled} onChange={() => toggleSize(s)} />
                      <span>{s}</span>
                    </label>
                    <input
                      className="field__input admin__size-stock"
                      type="number"
                      min="0"
                      value={sizeRows[s].stock}
                      onChange={(e) => changeStock(s, e.target.value)}
                      disabled={!sizeRows[s].enabled}
                      aria-label={`Stock talle ${s}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Input label="URL de la imagen" name="image" value={form.image} onChange={onChange} placeholder="https://…" />
            <label className="field">
              <span className="field__label">O sube una imagen</span>
              <input className="field__input" type="file" accept="image/*" onChange={onFile} disabled={uploading} />
            </label>
            <div className="admin__image-preview">
              {uploading ? (
                <div className="admin__image-placeholder">Subiendo…</div>
              ) : form.image ? (
                <img src={form.image} alt="Vista previa" />
              ) : (
                <div className="admin__image-placeholder">Sube o pega la URL de la imagen</div>
              )}
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

        {error && <p className="admin__form-error">{error}</p>}

        <div className="admin__form-actions">
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar producto'}
          </Button>
        </div>
      </form>
    </div>
  );
}
