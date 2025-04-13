// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", senha);

      const res = await api.post("/login", formData);
      login(res.data.access_token);
      navigate("/produtos");
    } catch (err: any) {
      setErro(err?.response?.data?.detail || "Erro ao fazer login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="border px-3 py-2 w-full"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {erro && <p className="text-red-500 text-sm">{erro}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 w-full"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
