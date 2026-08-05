import { useEffect, useState } from 'react';
import api from '../services/api';

function ResellerDashboard() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [imeiSearch, setImeiSearch] = useState('');

  const fetchReports = async (status, imei) => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (status) params.status = status;
      if (imei) params.imei = imei;
      const response = await api.get('/reports', { params });
      setReports(response.data.reports);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports('', '');
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchReports(statusFilter, imeiSearch);
  };

  const handleReset = () => {
    setStatusFilter('');
    setImeiSearch('');
    fetchReports('', '');
  };

  const stamps = {
    pending: { text: 'En attente', className: 'pending' },
    validated: { text: 'Confirmé volé', className: 'stolen' },
    rejected: { text: 'Rejeté', className: 'pending' },
    cleared: { text: 'Levé', className: 'clean' },
  };

  return (
    <div className="page-wide">
      <div className="dashboard-header">
        <h2>Signalements</h2>
        <span className="dashboard-count">{reports.length} affiché{reports.length > 1 ? 's' : ''}</span>
      </div>

      <form className="dashboard-filters" onSubmit={handleFilterSubmit}>
        <input
          type="text"
          value={imeiSearch}
          onChange={(e) => setImeiSearch(e.target.value)}
          placeholder="Rechercher un IMEI..."
          className="imei-code"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="validated">Confirmé volé</option>
          <option value="rejected">Rejeté</option>
          <option value="cleared">Levé</option>
        </select>
        <button type="submit" className="btn-primary">Filtrer</button>
        <button type="button" onClick={handleReset} className="btn-ghost-light">Réinitialiser</button>
      </form>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="msg-error">{error}</p>
      ) : reports.length === 0 ? (
        <div className="empty-state">Aucun signalement ne correspond à ces critères.</div>
      ) : (
        <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>IMEI</th>
              <th>Statut</th>
              <th>Déclarant</th>
              <th>Circonstances</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td className="imei-code">{r.imei}</td>
                <td>
                  <span className={`status-stamp compact ${stamps[r.status]?.className}`}>
                    {stamps[r.status]?.text || r.status}
                  </span>
                </td>
                <td>{r.reporter_phone}</td>
                <td>{r.circumstances_text || '—'}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default ResellerDashboard;