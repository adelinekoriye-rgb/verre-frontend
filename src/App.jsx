import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import VerifyPage from "./pages/VerifyPage";
import ReportPage from "./pages/ReportPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ResellerDashboard from "./pages/ResellerDashboard";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <span className="navbar-brand">VERRA</span>
        <Link to="/register">Inscription</Link>
        <Link to="/login">Connexion</Link>
        <Link to="/report">Signaler</Link>
        <Link to="/">Vérifier</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
  <Route path="/welcome" element={<WelcomePage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/" element={<PrivateRoute><VerifyPage /></PrivateRoute>} />
  <Route path="/report" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
  <Route path="/dashboard" element={<PrivateRoute><ResellerDashboard /></PrivateRoute>} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
