import { useState } from "react";
import api from "../services/api";

function VerifyPage() {
  const [imei, setImei] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await api.get(`/reports/verify/${imei}`);
      setResult(response.data.result);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de la vérification");
    } finally {
      setLoading(false);
    }
  };

  const stamps = {
    clean: { text: "Aucun signalement", className: "clean" },
    reported_pending: { text: "Signalé — en attente", className: "pending" },
    stolen: { text: "Confirmé volé", className: "stolen" },
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2>Vérifier un IMEI</h2>
        <form onSubmit={handleVerify}>
          <div className="form-row">
            <input
              type="text"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              placeholder="15 chiffres de l'IMEI"
              maxLength={15}
              className="imei-code"
              required
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "..." : "Vérifier"}
            </button>
          </div>
        </form>

        {error && <p className="msg-error">{error}</p>}

        {result && (
          <div className={`status-stamp ${stamps[result]?.className}`}>
            {stamps[result]?.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyPage;
