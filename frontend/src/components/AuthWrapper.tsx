// src/components/AuthWrapper.tsx
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";

interface AuthWrapperProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwt_decode(token);
      const now = Date.now() / 1000;
      if (decoded.exp < now) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (e) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-yellow-300 font-bold underline"
      : "text-white hover:text-yellow-300";

  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white flex space-x-4">
        <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
        <NavLink to="/produtos" className={linkClasses}>Produtos</NavLink>
        <NavLink to="/mercados" className={linkClasses}>Mercados</NavLink>
        <NavLink to="/precos" className={linkClasses}>Preços</NavLink>
      </nav>
      {children}
    </div>
  );
};