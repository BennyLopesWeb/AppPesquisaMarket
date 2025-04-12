// src/pages/Mercados.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

const MercadosPage = () => {
  const [mercados, setMercados] = useState([]);
  const [nome, setNome] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  const fetchMercados = async () => {
    const res = await api.get("/markets/");
    setMercados(res.data);
  };

  const createMercado = async () => {
    await api.post("/markets/", { name: nome, location: localizacao });
    setNome("");
    setLocalizacao("");
    fetchMercados();
  };

  const deleteMercado = async (id: number) => {
    await api.delete(`/markets/${id}`);
    fetchMercados();
  };

  useEffect(() => {
    fetchMercados();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Mercados</h1>
      <div className="mb-4">
        <input
          className="border px-2 py-1 mr-2"
          value={nome}
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border px-2 py-1 mr-2"
          value={localizacao}
          placeholder="Localização"
          onChange={(e) => setLocalizacao(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-1"
          onClick={createMercado}
        >
          Adicionar
        </button>
      </div>
      <ul>
        {mercados.map((m: any) => (
          <li key={m.id} className="mb-2">
            {m.name} ({m.location}) {" "}
            <button
              className="text-red-500"
              onClick={() => deleteMercado(m.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MercadosPage;

