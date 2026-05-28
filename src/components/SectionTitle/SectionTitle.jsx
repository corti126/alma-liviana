import './SectionTitle.css';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <header className={`section-title section-title--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </header>
  );
}
