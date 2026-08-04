import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/welcome');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" style={{ textDecoration: 'none' }}>VERRA</Link>
      {loggedIn ? (
        <>
          <Link to="/verify">Vérifier</Link>
          <Link to="/report">Signaler</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
          <button onClick={handleLogout} className="navbar-logout">Déconnexion</button>
        </>
      ) : (
        <>
          <Link to="/register">Inscription</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/contact">Contact</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;