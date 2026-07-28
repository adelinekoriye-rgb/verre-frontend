import { useState } from "react";
import api from "../services/api";

function ReportPage() {
  const [imei, setImei] = useState("");
  const [circumstances, setCircumstances] = useState("");
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const formData = new FormData();
    formData.append("imei", imei);
    formData.append("circumstances_text", circumstances);
    formData.append("proof", proof);

    try {
      const response = await api.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`Signalement enregistré — statut : ${response.data.status}`);
      setImei("");
      setCircumstances("");
      setProof(null);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors du signalement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2>Signaler un téléphone volé</h2>
        <form onSubmit={handleSubmit}>
          <label className="field-label">IMEI</label>
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
          </div>

          <label className="field-label">Circonstances du vol</label>
          <div className="form-row">
            <textarea
              value={circumstances}
              onChange={(e) => setCircumstances(e.target.value)}
              placeholder="Décris brièvement ce qui s'est passé"
            />
          </div>

          <label className="field-label">
            Preuve de possession (facture, photo)
          </label>
          <div className="file-field">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setProof(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Envoi..." : "Signaler"}
          </button>
        </form>

        {error && <p className="msg-error">{error}</p>}
        {message && <p className="msg-success">{message}</p>}
      </div>
    </div>
  );
}

export default ReportPage;
