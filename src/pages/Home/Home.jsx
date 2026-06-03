import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../components/HeroSection/HeroSection.jsx';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import { listProducts } from '../../firebase/products.js';
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

const values = [
  {
    title: 'Hecho con calma',
    text: 'Producimos en tandas pequeñas, sin prisa. Cada prenda recibe el tiempo y el cuidado que merece.',
  },
  {
    title: 'Algodón consciente',
    text: 'Elegimos algodones suaves y duraderos, pensados para acompañarte durante años, no una temporada.',
  },
  {
    title: 'Elegancia silenciosa',
    text: 'Diseños esenciales, sin estridencias. Piezas que se sienten propias desde el primer día.',
  },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await listProducts();
        if (active) setFeatured(data.filter((p) => p.featured && p.active).slice(0, 4));
      } catch {
        if (active) setFeatured([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

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
          {loading ? (
            <div style={{ padding: '3rem 0', display: 'grid', placeItems: 'center' }}>
              <LoadingSpinner />
            </div>
          ) : featured.length > 0 ? (
            <ProductGrid products={featured} />
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--color-text-soft, #8a7d72)' }}>
              Pronto verás aquí nuestras prendas destacadas.
            </p>
          )}
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
            <h2>Nacimos de un deseo simple: vestir con calma.</h2>
            <p>
              Alma Liviana comenzó en un pequeño taller, entre rollos de algodón y
              tardes de luz tibia. Queríamos una camiseta que se sintiera como un
              abrazo: suave, honesta y sin pretensiones. No encontramos esa prenda,
              así que decidimos crearla nosotras.
            </p>
            <p>
              Hoy seguimos fieles a esa idea. Trabajamos en pequeñas tandas, cuidando
              cada costura, cada tono y cada detalle del empaque. Creemos en la moda
              lenta, en lo esencial bien hecho y en las prendas que se quedan contigo
              durante años, no solo una temporada.
            </p>
            <blockquote className="home__founder">
              “Diseñamos para la mujer que elige sentirse cómoda sin renunciar a la
              elegancia. Cada Alma Liviana lleva un poco de esa calma que buscábamos.”
              <cite>— Valentina, fundadora de Alma Liviana</cite>
            </blockquote>
          </div>
          <div className="home__about-frame">
            <img
              src="https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80"
              alt="Taller boutique de Alma Liviana"
            />
          </div>
        </div>
      </section>

      <section className="section home__values">
        <div className="container">
          <SectionTitle eyebrow="Lo que nos mueve" title="Nuestros valores" align="center" />
          <div className="home__values-grid">
            {values.map((v) => (
              <div key={v.title} className="home__value">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
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
