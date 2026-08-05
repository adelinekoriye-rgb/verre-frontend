import { useEffect, useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell,
} from 'recharts';
import api from '../services/api';

const STATUS_LABELS = {
  pending: 'En attente', validated: 'Confirmé volé', rejected: 'Rejeté', cleared: 'Levé',
};
const STATUS_COLORS = {
  pending: '#C97A2B', validated: '#B23A2E', rejected: '#9CA3AF', cleared: '#1B7A5C',
};
const RESULT_LABELS = { clean: 'Propre', reported_pending: 'En attente', stolen: 'Volé' };
const RESULT_COLORS = { clean: '#1B7A5C', reported_pending: '#C97A2B', stolen: '#B23A2E' };

function StatsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/reports/stats');
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="page-wide"><p>Chargement...</p></div>;
  if (error) return <div className="page-wide"><p className="msg-error">{error}</p></div>;

  const statusData = stats.byStatus.map((s) => ({
    name: STATUS_LABELS[s.status] || s.status,
    value: s.count,
    color: STATUS_COLORS[s.status] || '#9CA3AF',
  }));

  const resultData = stats.byResult.map((r) => ({
    name: RESULT_LABELS[r.result] || r.result,
    value: r.count,
    color: RESULT_COLORS[r.result] || '#9CA3AF',
  }));

  const dayData = stats.byDay.map((d) => ({
    day: new Date(d.day).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    count: d.count,
  }));

  return (
    <div className="page-wide">
      <div className="dashboard-header">
        <h2>Statistiques</h2>
      </div>

      <div className="stats-summary">
        <div className="stats-summary-card">
          <div className="stats-summary-number">{stats.totals.total_reports}</div>
          <div className="stats-summary-label">Signalements</div>
        </div>
        <div className="stats-summary-card">
          <div className="stats-summary-number">{stats.totals.total_verifications}</div>
          <div className="stats-summary-label">Vérifications</div>
        </div>
        <div className="stats-summary-card">
          <div className="stats-summary-number">{stats.totals.total_users}</div>
          <div className="stats-summary-label">Utilisateurs</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="form-card">
          <h3 className="stats-chart-title">Signalements — 14 derniers jours</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3E0D8" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E3E0D8' }} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#14213D" radius={[4, 4, 0, 0]} name="Signalements" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="form-card">
          <h3 className="stats-chart-title">Répartition des signalements</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="form-card">
          <h3 className="stats-chart-title">Résultats de vérification</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={resultData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {resultData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;