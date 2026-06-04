import { Link } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Alma Liviana · Edición de temporada</span>
          <h1>
            Vestir con calma,<br />
            <em>moverse con alma.</em>
          </h1>
          <p>
            Remeras hechas a mano en algodón suave, pensadas para mujeres que
            visten lo esencial con elegancia. Una colección breve, lenta y atemporal.
          </p>
          <div className="hero__cta">
            <Link to="/products"><Button variant="primary" size="lg">Descubre la colección</Button></Link>
            <a href="#about"><Button variant="link">Nuestra historia</Button></a>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__photo hero__photo--main" />
          <div className="hero__photo hero__photo--side" />
          <span className="hero__badge">Hecho con calma</span>
        </div>
      </div>
    </section>
  );
}
