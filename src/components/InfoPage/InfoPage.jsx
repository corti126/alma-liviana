import SectionTitle from '../SectionTitle/SectionTitle.jsx';
import './InfoPage.css';

export default function InfoPage({ eyebrow = 'Alma Liviana', title, intro, children }) {
  return (
    <div className="info-page">
      <div className="container info-page__inner">
        <SectionTitle eyebrow={eyebrow} title={title} subtitle={intro} />
        <div className="info-page__content">{children}</div>
      </div>
    </div>
  );
}

export function InfoSection({ heading, children }) {
  return (
    <section className="info-block">
      {heading && <h2 className="info-block__heading">{heading}</h2>}
      <div className="info-block__body">{children}</div>
    </section>
  );
}
