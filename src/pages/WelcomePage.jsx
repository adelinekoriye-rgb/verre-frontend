import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, ScanSearch, Users } from "lucide-react";

const slides = [
  {
    icon: ShieldAlert,
    title: "Un téléphone volé ? Déclare-le",
    text: "En quelques minutes, signale l'IMEI de ton appareil volé avec une preuve de possession.",
  },
  {
    icon: ScanSearch,
    title: "Avant d'acheter, vérifie",
    text: "N'importe qui peut vérifier un IMEI en quelques secondes avant un achat d'occasion.",
  },
  {
    icon: Users,
    title: "Un registre de confiance",
    text: "Chaque signalement est validé pour éviter les abus — la communauté protège la communauté.",
  },
];

function WelcomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
  <div className="welcome-wrap">
    <div className="welcome-brand">
      <div className="brand-name">WoilaTech</div>
      <div className="brand-tagline">Le registre communautaire des téléphones volés</div>
    </div>
    <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => {
            const Icon = slide.icon;
            return (
              <div className="slide" key={i}>
                <div className="slide-badge">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <Icon size={40} className="slide-icon" strokeWidth={1.5} />
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            );
          })}
        </div>
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Aller à la diapositive ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="welcome-cta">
        <Link
          to="/register"
          className="btn-primary"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          Créer un compte
        </Link>
        <p className="form-footer">
          Déjà inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
