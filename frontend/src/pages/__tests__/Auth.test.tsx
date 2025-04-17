// src/pages/__tests__/Auth.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../Login";
import Dashboard from "../Dashboard";
import ProdutosPage from "../ProdutosPage";
import MercadosPage from "../MercadosPage";
import PrecosPage from "../PrecosPage";
import api from "../../services/api";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../services/api");
const mockedApi = api as jest.Mocked<typeof api>;

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve realizar login com sucesso e salvar o token", async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: {
        access_token: "fake-jwt-token",
        token_type: "bearer",
      },
    });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith(
        "/login",
        expect.any(FormData),
        expect.any(Object)
      );
      expect(localStorage.getItem("token")).toBe("fake-jwt-token");
    });
  });

  it("deve mostrar erro se o login falhar", async () => {
    mockedApi.post.mockRejectedValueOnce({
      response: { data: { detail: "Credenciais inválidas" } },
    });

    renderWithRouter(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(screen.getByText("Credenciais inválidas" || "Erro no login"));
    });
  });
});

describe("ProdutosPage", () => {
  it("deve renderizar produtos mockados", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Produto A", category: "Categoria A" },
        { id: 2, name: "Produto B", category: "Categoria B" },
      ],
    });

    renderWithRouter(<ProdutosPage />);

    await waitFor(() => {
      expect(screen.getByText("Produto A (Categoria A)"));
      expect(screen.getByText("Produto B (Categoria B)"));
    });
  });

  it("deve permitir criar e excluir produto", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] });
    mockedApi.post.mockResolvedValueOnce({ data: {} });
    mockedApi.get.mockResolvedValueOnce({
      data: [
        { id: 3, name: "Novo Produto", category: "Nova Categoria" },
      ],
    });

    renderWithRouter(<ProdutosPage />);

    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "Novo Produto" },
    });
    fireEvent.change(screen.getByPlaceholderText("Categoria"), {
      target: { value: "Nova Categoria" },
    });
    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalled();
      expect(screen.getByText("Novo Produto (Nova Categoria)"));
    });

    mockedApi.delete.mockResolvedValueOnce({});
    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalled();
    });
  });
});

describe("MercadosPage", () => {
  it("deve renderizar mercados mockados", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        { id: 1, name: "Mercado X" },
        { id: 2, name: "Mercado Y" },
      ],
    });

    renderWithRouter(<MercadosPage />);

    await waitFor(() => {
      expect(screen.getByText("Mercado X"));
      expect(screen.getByText("Mercado Y"));
    });
  });

  it("deve permitir criar e excluir mercado", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] });
    mockedApi.post.mockResolvedValueOnce({ data: {} });
    mockedApi.get.mockResolvedValueOnce({
      data: [
        { id: 3, name: "Novo Mercado" },
      ],
    });

    renderWithRouter(<MercadosPage />);

    fireEvent.change(screen.getByPlaceholderText("Nome do mercado"), {
      target: { value: "Novo Mercado" },
    });
    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalled();
      expect(screen.getByText("Novo Mercado"));
    });

    mockedApi.delete.mockResolvedValueOnce({});
    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalled();
    });
  });
});

describe("PrecosPage", () => {
  it("deve renderizar preços mockados", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          product: { name: "Arroz" },
          market: { name: "Supermercado Z" },
          price: 12.5,
        },
      ],
    });

    renderWithRouter(<PrecosPage />);

    await waitFor(() => {
      expect(screen.getByText(/Arroz - R\$12.5 - Supermercado Z/));
    });
  });

  it("deve permitir criar e excluir preço", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] });
    mockedApi.post.mockResolvedValueOnce({ data: {} });
    mockedApi.get.mockResolvedValueOnce({
      data: [
        {
          id: 2,
          product: { name: "Feijão" },
          market: { name: "Supermercado B" },
          price: 7.99,
        },
      ],
    });

    renderWithRouter(<PrecosPage />);

    fireEvent.change(screen.getByPlaceholderText("Produto"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mercado"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Preço"), {
      target: { value: "7.99" },
    });
    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalled();
      expect(screen.getByText(/Feijão - R\$7.99 - Supermercado B/));
    });

    mockedApi.delete.mockResolvedValueOnce({});
    fireEvent.click(screen.getByText("Excluir"));

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalled();
    });
  });
});

