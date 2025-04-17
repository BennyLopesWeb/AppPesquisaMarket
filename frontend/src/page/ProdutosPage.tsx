import { useEffect, useState } from "react";
import api from "../services/api";

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");

  const fetchProdutos = async () => {
    const res = await api.get("/products/");
    setProdutos(res.data);
  };

  const createProduto = async () => {
    await api.post("/products/", { name: nome, category: categoria });
    setNome("");
    setCategoria("");
    fetchProdutos();
  };

  const deleteProduto = async (id: number) => {
    await api.delete(`/products/${id}`);
    fetchProdutos();
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Produtos</h1>
      <div className="mb-4">
        <input
          className="border px-2 py-1 mr-2"
          value={nome}
          placeholder="Nome"
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border px-2 py-1 mr-2"
          value={categoria}
          placeholder="Categoria"
          onChange={(e) => setCategoria(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-1" onClick={createProduto}>
          Adicionar
        </button>
      </div>
      <ul>
        {produtos.map((p: any) => (
          <li key={p.id} className="mb-2">
            {p.name} ({p.category}){" "}
            <button className="text-red-500" onClick={() => deleteProduto(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProdutosPage;
