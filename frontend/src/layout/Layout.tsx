import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Price Market</h1>
      </header>
      <nav className="bg-gray-100 p-4 space-x-4">
        <Link to="/produtos" className="text-blue-600">Produtos</Link>
        <Link to="/mercados" className="text-blue-600">Mercados</Link>
        <Link to="/precos" className="text-blue-600">Preços</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
