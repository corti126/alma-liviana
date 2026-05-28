export default function ProtectedRoute({ children, roles }) {
  const { user, loading, hasRole, reloadUser } = useAuth(); // Asegúrate de traer 'loading'
  const location = useLocation();

  // 1. Si está cargando, no renderizamos nada (o un spinner)
  if (loading) return <p>Cargando...</p>;

  // 2. Si no hay usuario, login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // 3. BLOQUEO ESTRICTO: Si existe el usuario pero NO está verificado
  if (user.emailVerified === false) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Verifica tu cuenta</h1>
          <p>Hemos enviado un enlace a <b>{user.email}</b>.</p>
          <button onClick={async () => {
            await reloadUser(); 
            window.location.reload(); 
          }}>
            Ya verifiqué mi correo
          </button>
        </div>
      </div>
    );
  }

  // 4. Si está verificado, comprobamos roles
  if (roles && roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/" replace />;
  }

  return children;
}