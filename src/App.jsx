import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import VerifyPage from "./pages/VerifyPage";
import ReportPage from "./pages/ReportPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ResellerDashboard from "./pages/ResellerDashboard";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
  <Route path="/welcome" element={<WelcomePage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
 <Route path="/verify" element={<PrivateRoute><VerifyPage /></PrivateRoute>} />
  <Route path="/report" element={<PrivateRoute><ReportPage /></PrivateRoute>} />
  <Route path="/dashboard" element={<PrivateRoute><ResellerDashboard /></PrivateRoute>} />
  <Route path="/stats" element={<PrivateRoute><StatsPage /></PrivateRoute>} />
  <Route path="/contact" element={<ContactPage />} />
</Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
