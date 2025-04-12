import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-blue-300">🏠 Início</Link>
        <Link to="/produtos" className="block hover:text-blue-300">📦 Produtos</Link>
        <Link to="/mercados" className="block hover:text-blue-300">🏪 Mercados</Link>
        <Link to="/precos" className="block hover:text-blue-300">💰 Preços</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
