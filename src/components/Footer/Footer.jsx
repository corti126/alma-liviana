import { Link } from 'react-router-dom';
import { BUSINESS_PHONE } from '../../services/whatsapp.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__mark">A·L</div>
          <h3 className="footer__title">Alma Liviana</h3>
          <p className="footer__tag">Moda boutique, hecha con calma.</p>
        </div>

        <div className="footer__cols">
          <div>
            <h4>Tienda</h4>
            <Link to="/products">Camisetas</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/mi-cuenta">Mi cuenta</Link>
          </div>
          <div>
            <h4>Atención</h4>
            <Link to="/envios">Envíos</Link>
            <Link to="/cambios-y-devoluciones">Cambios y devoluciones</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/preguntas-frecuentes">Preguntas frecuentes</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <Link to="/terminos-y-condiciones">Términos y condiciones</Link>
            <Link to="/politica-de-privacidad">Política de privacidad</Link>
          </div>
          <div>
            <h4>Síguenos</h4>
            <a href="https://instagram.com/almaliviana" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={`https://wa.me/${BUSINESS_PHONE}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} Alma Liviana. Todos los derechos reservados.</span>
        <span>Hecho con cariño.</span>
      </div>
    </footer>
  );
}
