// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProdutosPage from "./pages/ProdutosPage";
import MercadosPage from "./pages/MercadosPage";
import PrecosPage from "./pages/PrecosPage";

function App() {
  return (
    <Router>
      <div className="p-6 font-sans">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Price Market!</h1>

        <nav className="mb-6 space-x-4">
          <Link className="text-blue-600 hover:underline" to="/produtos">Produtos</Link>
          <Link className="text-blue-600 hover:underline" to="/mercados">Mercados</Link>
          <Link className="text-blue-600 hover:underline" to="/precos">Preços</Link>
        </nav>

        <Routes>
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/mercados" element={<MercadosPage />} />
          <Route path="/precos" element={<PrecosPage />} />
          <Route path="/" element={<p>Escolha uma opção acima para começar.</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
