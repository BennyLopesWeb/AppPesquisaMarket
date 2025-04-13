// src/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ProdutosPage from "./pages/ProdutosPage";
import MercadosPage from "./pages/MercadosPage";
import PrecosPage from "./pages/PrecosPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { state: { message: "Logout realizado com sucesso." } });
  };

  return (
    <nav className="mb-6 space-x-4">
      <Link className="text-blue-600 hover:underline" to="/produtos">Produtos</Link>
      <Link className="text-blue-600 hover:underline" to="/mercados">Mercados</Link>
      <Link className="text-blue-600 hover:underline" to="/precos">Preços</Link>
      {!isAuthenticated ? (
        <Link className="text-blue-600 hover:underline" to="/login">Login</Link>
      ) : (
        <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
      )}
    </nav>
  );
}

function LoginMessage() {
  const location = useLocation();
  const message = location.state?.message;

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return message ? (
    <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
      {message}
    </div>
  ) : null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="p-6 font-sans">
          <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Price Market!</h1>

          <Navbar />
          <LoginMessage />

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/produtos"
              element={
                <PrivateRoute>
                  <ProdutosPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/mercados"
              element={
                <PrivateRoute>
                  <MercadosPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/precos"
              element={
                <PrivateRoute>
                  <PrecosPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<p>Escolha uma opção acima para começar.</p>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
