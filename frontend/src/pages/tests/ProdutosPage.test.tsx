import { render, screen, fireEvent } from "@testing-library/react";
import ProdutosPage from "../ProdutosPage";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../services/api";

jest.mock("../../services/api");

describe("ProdutosPage", () => {
  beforeEach(() => {
    (api.default.get as jest.Mock).mockResolvedValue({
      data: [
        { id: 1, name: "Arroz", category: "Alimento" },
        { id: 2, name: "Leite", category: "Bebida" },
      ],
    });
  });

  it("deve renderizar lista de produtos", async () => {
    render(
      <BrowserRouter>
        <ProdutosPage />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Arroz/)).toBeInTheDocument();
    expect(screen.getByText(/Leite/)).toBeInTheDocument();
  });

  it("deve permitir adicionar produto", async () => {
    render(
      <BrowserRouter>
        <ProdutosPage />
      </BrowserRouter>
    );

    const nomeInput = screen.getByPlaceholderText("Nome");
    const categoriaInput = screen.getByPlaceholderText("Categoria");
    const addButton = screen.getByText("Adicionar");

    fireEvent.change(nomeInput, { target: { value: "Feijão" } });
    fireEvent.change(categoriaInput, { target: { value: "Grãos" } });
    fireEvent.click(addButton);

    expect(api.default.post).toHaveBeenCalledWith("/products/", {
      name: "Feijão",
      category: "Grãos",
    });
  });
});
