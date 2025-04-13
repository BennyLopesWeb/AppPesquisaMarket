
// src/pages/Precos.tsx
import { useEffect, useState } from "react";
import api from "../services/api";

const PrecosPage = () => {
  const [precos, setPrecos] = useState([]);
  const [valor, setValor] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [mercadoId, setMercadoId] = useState("");

  const fetchPrecos = async () => {
    const res = await api.get("/prices/");
    setPrecos(res.data);
  };

  const createPreco = async () => {
    await api.post("/prices/", {
      value: parseFloat(valor),
      product_id: parseInt(produtoId),
      market_id: parseInt(mercadoId),
    });
    setValor("");
    setProdutoId("");
    setMercadoId("");
    fetchPrecos();
  };

  const deletePreco = async (id: number) => {
    await api.delete(`/prices/${id}`);
    fetchPrecos();
  };

  useEffect(() => {
    fetchPrecos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Preços</h1>
      <div className="mb-4">
        <input
          className="border px-2 py-1 mr-2"
          value={valor}
          placeholder="Valor"
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          className="border px-2 py-1 mr-2"
          value={produtoId}
          placeholder="ID Produto"
          onChange={(e) => setProdutoId(e.target.value)}
        />
        <input
          className="border px-2 py-1 mr-2"
          value={mercadoId}
          placeholder="ID Mercado"
          onChange={(e) => setMercadoId(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-1" onClick={createPreco}>
          Adicionar
        </button>
      </div>
      <ul>
        {precos.map((p: any) => (
          <li key={p.id} className="mb-2">
            R$ {p.value.toFixed(2)} - Produto {p.product_id}, Mercado {p.market_id} {" "}
            <button className="text-red-500" onClick={() => deletePreco(p.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrecosPage;