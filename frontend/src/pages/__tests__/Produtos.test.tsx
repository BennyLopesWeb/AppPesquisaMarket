// src/pages/__tests__/Produtos.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProdutosPage from "../Produtos";
import api from "../../services/api";

jest.mock("../../services/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("ProdutosPage", () => {
  beforeEach(() => {
    mockedApi.get.mockResolvedValue({ data: [] });
  });

  it("deve renderizar a lista de produtos", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Arroz", category: "Alimento" },
        { id: 2, name: "Leite", category: "Bebida" },
      ],
    });

    render(<ProdutosPage />);

    await waitFor(() => {
      expect(screen.getByText("Arroz (Alimento)")).toBeInTheDocument();
      expect(screen.getByText("Leite (Bebida)")).toBeInTheDocument();
    });
  });

  it("deve permitir adicionar um novo produto", async () => {
    render(<ProdutosPage />);

    const nomeInput = screen.getByPlaceholderText("Nome");
    const categoriaInput = screen.getByPlaceholderText("Categoria");
    const addButton = screen.getByText("Adicionar");

    fireEvent.change(nomeInput, { target: { value: "Farinha" } });
    fireEvent.change(categoriaInput, { target: { value: "Grão" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith("/products/", {
        name: "Farinha",
        category: "Grão",
      });
    });
  });

  it("deve permitir excluir um produto", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [{ id: 1, name: "Feijão", category: "Grão" }],
    });

    render(<ProdutosPage />);

    await waitFor(() => {
      expect(screen.getByText("Feijão (Grão)")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalledWith("/products/1");
    });
  });
});