import './Input.css';

export default function Input({ label, error, id, as = 'input', ...rest }) {
  const inputId = id || rest.name;
  const Tag = as;
  return (
    <label className="field" htmlFor={inputId}>
      {label && <span className="field__label">{label}</span>}
      <Tag id={inputId} className="field__input" {...rest} />
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
