import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import { getFeatured } from '../../data/products.js';
import './Home.css';

const testimonials = [
  {
    quote: '“La tela es tan suave que ya no quiero usar otra cosa. Es mi camiseta favorita del armario.”',
    author: 'María José, Bogotá',
  },
  {
    quote: '“Una marca con alma. Se nota el cuidado en cada detalle, desde la prenda hasta el empaque.”',
    author: 'Lucía, Medellín',
  },
  {
    quote: '“Elegante, liviana y atemporal. Justo lo que estaba buscando.”',
    author: 'Andrea, Cali',
  },
];

const editorial = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80',
];

export default function Home() {
  const featured = getFeatured().slice(0, 4);

  return (
    <>
      <HeroSection />

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Nuestras favoritas"
            title="Camisetas pensadas con calma"
            subtitle="Una pequeña selección de las piezas más queridas de la temporada."
          />
          <ProductGrid products={featured} />
          <div className="home__cta-row">
            <Link to="/products"><Button variant="ghost">Ver toda la colección</Button></Link>
          </div>
        </div>
      </section>

      <section className="section home__editorial">
        <div className="container">
          <div className="home__editorial-grid">
            <div className="home__editorial-copy">
              <span className="eyebrow">Editorial</span>
              <h2>Un guardarropa que respira.</h2>
              <p>
                Diseñamos pocas piezas, pensadas con detalle. Cada camiseta nace
                de telas suaves, costuras delicadas y un compromiso con lo simple.
              </p>
              <Link to="/products"><Button variant="link">Explorar colección</Button></Link>
            </div>
            <div className="home__editorial-images">
              {editorial.map((src, i) => (
                <div key={i} className={`home__editorial-img home__editorial-img--${i}`} style={{ backgroundImage: `url(${src})` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section home__about">
        <div className="container home__about-inner">
          <div className="home__about-copy">
            <span className="eyebrow">Sobre Alma Liviana</span>
            <h2>Moda lenta, hecha con intención.</h2>
            <p>
              Alma Liviana nace del deseo de vestir con calma. Creamos camisetas
              boutique en algodón cuidado, en pequeñas tandas, para mujeres que
              eligen lo esencial. Nuestra marca es femenina, serena y cálida.
            </p>
            <p>
              Creemos en lo artesanal, en la elegancia silenciosa y en las
              prendas que se quedan contigo durante años.
            </p>
          </div>
          <div className="home__about-frame">
            <img
              src="https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80"
              alt="Alma Liviana boutique"
            />
          </div>
        </div>
      </section>

      <section className="section home__testimonials">
        <div className="container">
          <SectionTitle
            eyebrow="Lo que dicen"
            title="Voces que llevamos con cariño"
            align="center"
          />
          <div className="home__testimonials-grid">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="home__quote">
                <p>{t.quote}</p>
                <cite>— {t.author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section home__cta">
        <div className="container home__cta-inner">
          <h2>Hecho con calma. Vestido con alma.</h2>
          <p>Descubre la colección de camisetas Alma Liviana y encuentra tu favorita.</p>
          <Link to="/products"><Button variant="primary" size="lg">Ir a la tienda</Button></Link>
        </div>
      </section>
    </>
  );
}
