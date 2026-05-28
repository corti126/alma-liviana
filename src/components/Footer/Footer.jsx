import { Link } from 'react-router-dom';
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
            <Link to="/products">Novedades</Link>
            <Link to="/cart">Carrito</Link>
          </div>
          <div>
            <h4>Atención</h4>
            <a href="#">Envíos</a>
            <a href="#">Cambios</a>
            <a href="#">Contacto</a>
          </div>
          <div>
            <h4>Síguenos</h4>
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
            <a href="#">WhatsApp</a>
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
