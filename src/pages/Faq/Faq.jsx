import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import './Faq.css';

const faqs = [
  {
    q: '¿Cuánto tarda en llegar mi pedido?',
    a: 'En ciudades principales entre 2 y 4 días hábiles, y en otras zonas de 4 a 7 días hábiles. Despachamos dentro de las 48 horas siguientes a la confirmación.',
  },
  {
    q: '¿Cómo elijo mi talla?',
    a: 'Cada producto muestra los talles disponibles (S, M, L, XL). Si tienes dudas, escríbenos por WhatsApp y te ayudamos a encontrar tu talla ideal según tu estilo preferido.',
  },
  {
    q: '¿Qué pasa si mi talla está agotada?',
    a: 'Las tallas sin stock aparecen marcadas como "Sin stock" y no pueden añadirse al carrito. Trabajamos en pequeñas tandas, así que vale la pena escribirnos para avisarte cuando vuelva.',
  },
  {
    q: '¿Puedo cambiar o devolver una prenda?',
    a: 'Sí. Tienes hasta 15 días para solicitar un cambio o devolución, siempre que la prenda conserve sus etiquetas y no presente uso. Revisa los detalles en Cambios y devoluciones.',
  },
  {
    q: '¿Cómo realizo el pago?',
    a: 'El pedido se coordina por WhatsApp. Allí confirmamos disponibilidad, total y el medio de pago que prefieras de los habilitados.',
  },
  {
    q: '¿Cómo se hacen los pedidos por WhatsApp?',
    a: 'Agrega tus prendas al carrito, inicia sesión y pulsa "Finalizar por WhatsApp". Se abrirá un mensaje con el detalle de tu pedido listo para enviarnos.',
  },
  {
    q: '¿Puedo hacer seguimiento a mi pedido?',
    a: 'Claro. Una vez despachado, te compartimos el número de guía por WhatsApp para que sigas tu paquete hasta tu puerta.',
  },
  {
    q: '¿Necesito una cuenta para comprar?',
    a: 'Sí. Para finalizar la compra te pedimos iniciar sesión; así podemos asociar tu pedido y brindarte una mejor atención.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-page">
      <div className="container faq-page__inner">
        <SectionTitle
          eyebrow="Ayuda"
          title="Preguntas frecuentes"
          subtitle="Resolvemos las dudas más comunes sobre tu experiencia en Alma Liviana."
        />
        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="faq-item__q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <div className="faq-item__a">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
