import { Link } from 'react-router-dom';
import { ShieldAlert, ScanSearch, LayoutDashboard } from 'lucide-react';

function HomePage() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="page-wide">
      <div className="home-header">
        <h2>Bonjour{user?.name ? `, ${user.name}` : ''} 👋</h2>
        <p className="home-sub">Que veux-tu faire aujourd'hui ?</p>
      </div>

      <div className="home-grid">
        <Link to="/verify" className="home-card">
          <ScanSearch size={30} strokeWidth={1.5} />
          <h3>Vérifier un IMEI</h3>
          <p>Contrôle un appareil avant un achat en quelques secondes.</p>
        </Link>

        <Link to="/report" className="home-card">
          <ShieldAlert size={30} strokeWidth={1.5} />
          <h3>Signaler un vol</h3>
          <p>Déclare un IMEI volé avec une preuve de possession.</p>
        </Link>

        {(user?.role === 'revendeur' || user?.role === 'admin') && (
          <Link to="/dashboard" className="home-card">
            <LayoutDashboard size={30} strokeWidth={1.5} />
            <h3>Dashboard</h3>
            <p>Consulte l'ensemble des signalements enregistrés.</p>
          </Link>
        )}
      </div>
    </div>
  );
}

export default HomePage;