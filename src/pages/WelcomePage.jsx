import { Link } from 'react-router-dom';
import { ShieldAlert, ScanSearch, Users, CheckCircle2, FileWarning, Smartphone } from 'lucide-react';

function WelcomePage() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-brand">
          <div className="brand-name">VERRA</div>
        </div>
        <h1 className="hero-title">Le registre communautaire<br />des téléphones volés</h1>
        <p className="hero-subtitle">
          Signalez un vol en quelques minutes. Vérifiez un IMEI avant d'acheter.
          Une protection simple, fiable et accessible à tous à Ngaoundéré.
        </p>
        <div className="hero-cta">
          <Link to="/register" className="btn-primary btn-lg">Créer un compte gratuit</Link>
          <Link to="/login" className="btn-ghost">Se connecter</Link>
        </div>
      </section>

      {/* Problème / Solution */}
      <section className="landing-section landing-section-alt">
        <div className="section-inner">
          <span className="section-eyebrow">Le problème</span>
          <h2>Le marché de l'occasion n'a aucun moyen de vérification</h2>
          <p className="section-lead">
            Un acheteur n'a aucun moyen de savoir si le téléphone qu'il s'apprête à
            acheter est volé. Une victime n'a aucun canal simple pour le signaler
            et le rendre invendable.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <FileWarning size={28} strokeWidth={1.5} />
              <h3>Aucun signalement centralisé</h3>
              <p>Les vols circulent librement sur le marché de seconde main.</p>
            </div>
            <div className="feature-card">
              <ShieldAlert size={28} strokeWidth={1.5} />
              <h3>Risque pour l'acheteur</h3>
              <p>Acheter un appareil volé sans le savoir expose à des poursuites.</p>
            </div>
            <div className="feature-card">
              <Smartphone size={28} strokeWidth={1.5} />
              <h3>Blocage IMEI inaccessible</h3>
              <p>Les procédures officielles existent mais restent hors de portée du citoyen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="landing-section">
        <div className="section-inner">
          <span className="section-eyebrow">Comment ça marche</span>
          <h2>Trois étapes, en toute confiance</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <ShieldAlert size={26} strokeWidth={1.5} />
              <h3>Signalez</h3>
              <p>Déclarez l'IMEI de votre appareil volé avec une preuve de possession.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <CheckCircle2 size={26} strokeWidth={1.5} />
              <h3>Validation</h3>
              <p>Chaque signalement est vérifié pour empêcher les abus et faux signalements.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <ScanSearch size={26} strokeWidth={1.5} />
              <h3>Vérifiez</h3>
              <p>Avant d'acheter, n'importe qui vérifie un IMEI en quelques secondes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / confiance */}
      <section className="landing-stats">
        <div className="section-inner stats-inner">
          <div className="stat">
            <Users size={22} strokeWidth={1.5} />
            <div>
              <div className="stat-number">Communautaire</div>
              <div className="stat-label">Chacun protège les autres</div>
            </div>
          </div>
          <div className="stat">
            <ShieldAlert size={22} strokeWidth={1.5} />
            <div>
              <div className="stat-number">Anti-abus</div>
              <div className="stat-label">Preuve exigée, validation manuelle</div>
            </div>
          </div>
          <div className="stat">
            <ScanSearch size={22} strokeWidth={1.5} />
            <div>
              <div className="stat-number">Instantané</div>
              <div className="stat-label">Vérification en quelques secondes</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="landing-final-cta">
        <h2>Protégez-vous, ou protégez votre prochain achat</h2>
        <Link to="/register" className="btn-primary btn-lg">Commencer maintenant</Link>
      </section>
    </div>
  );
}

export default WelcomePage;