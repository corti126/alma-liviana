import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { BUSINESS_PHONE } from '../../services/whatsapp.js';
import './Contact.css';

const INSTAGRAM = 'almaliviana';
const EMAIL = 'hola@almaliviana.co';

const validate = (form) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'Ingresa tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Ingresa un correo válido.';
  if (form.message.trim().length < 10) errors.message = 'Cuéntanos un poco más (mín. 10 caracteres).';
  return errors;
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const waMessage = encodeURIComponent('¡Hola Alma Liviana! Tengo una consulta 💌');

  return (
    <div className="contact-page">
      <div className="container">
        <SectionTitle
          eyebrow="Contacto"
          title="Hablemos con calma"
          subtitle="Estamos aquí para ayudarte. Escríbenos y te responderemos con cariño."
        />

        <div className="contact-page__grid">
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <Input label="Nombre" name="name" value={form.name} onChange={onChange} error={errors.name} required />
            <Input label="Correo" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} required />
            <Input
              as="textarea"
              rows={5}
              label="Mensaje"
              name="message"
              value={form.message}
              onChange={onChange}
              error={errors.message}
              required
            />
            {sent && (
              <p className="contact-form__success">
                ¡Gracias por escribirnos! Te responderemos muy pronto. 🌿
              </p>
            )}
            <Button type="submit" variant="primary" size="lg" className="btn--block">
              Enviar mensaje
            </Button>
          </form>

          <aside className="contact-info">
            <div className="contact-info__block">
              <h3>WhatsApp</h3>
              <p>La forma más rápida de coordinar pedidos y resolver dudas.</p>
              <a
                className="contact-info__link"
                href={`https://wa.me/${BUSINESS_PHONE}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Escribir por WhatsApp →
              </a>
            </div>
            <div className="contact-info__block">
              <h3>Instagram</h3>
              <p>Inspiración, novedades y detrás de cámaras de la boutique.</p>
              <a
                className="contact-info__link"
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{INSTAGRAM} →
              </a>
            </div>
            <div className="contact-info__block">
              <h3>Correo</h3>
              <p>Para consultas más detalladas o colaboraciones.</p>
              <a className="contact-info__link" href={`mailto:${EMAIL}`}>
                {EMAIL} →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
