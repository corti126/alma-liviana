import { useTheme } from '../../context/ThemeContext.jsx';
import './ThemeToggle.css';

/**
 * Accessible light/dark theme switcher.
 * `variant`:
 *   - "icon"  (default) compact circular button for navbars/topbars
 *   - "full"  pill button with label, used inside menus/sidebars
 */
export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? 'Activar modo claro' : 'Activar modo oscuro';

  const Icon = isDark ? (
    // Sun
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    // Moon
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );

  return (
    <button
      type="button"
      className={`theme-toggle theme-toggle--${variant} ${className}`}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {Icon}
      {variant === 'full' && (
        <span className="theme-toggle__text">{isDark ? 'Modo claro' : 'Modo oscuro'}</span>
      )}
    </button>
  );
}
