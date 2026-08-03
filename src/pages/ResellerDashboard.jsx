import { useEffect, useState } from "react";
import api from "../services/api";

function ResellerDashboard() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/reports");
        setReports(response.data.reports);
      } catch (err) {
        setError(err.response?.data?.error || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const stamps = {
    pending: { text: "En attente", className: "pending" },
    validated: { text: "Confirmé volé", className: "stolen" },
    rejected: { text: "Rejeté", className: "pending" },
    cleared: { text: "Levé", className: "clean" },
  };

  if (loading)
    return (
      <div className="page-wide">
        <p>Chargement...</p>
      </div>
    );
  if (error)
    return (
      <div className="page-wide">
        <p className="msg-error">{error}</p>
      </div>
    );

  return (
    <div className="page-wide">
      <div className="dashboard-header">
        <h2>Signalements</h2>
        <span className="dashboard-count">{reports.length} au total</span>
      </div>

      {reports.length === 0 ? (
        <div className="empty-state">Aucun signalement pour le moment.</div>
      ):(
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
                  <span
                    className={`status-stamp compact ${stamps[r.status]?.className}`}
                  >
                    {stamps[r.status]?.text || r.status}
                  </span>
                </td>
                <td>{r.reporter_phone}</td>
                <td>{r.circumstances_text || "—"}</td>
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
