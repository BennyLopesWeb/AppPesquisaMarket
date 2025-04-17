// src/pages/__tests__/MercadosPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MercadosPage from "../MercadosPage";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../services/api";

jest.mock("../../services/api");

const mockedApi = api.default as jest.Mocked<typeof api.default>;

describe("MercadosPage", () => {
  beforeEach(() => {
    mockedApi.get.mockResolvedValue({
      data: [
        { id: 1, name: "Supermercado A" },
        { id: 2, name: "Supermercado B" },
      ],
    });
  });

  it("deve renderizar lista de mercados", async () => {
    render(
      <BrowserRouter>
        <MercadosPage />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Supermercado A/)).toBeInTheDocument();
    expect(screen.getByText(/Supermercado B/)).toBeInTheDocument();
  });

  it("deve permitir adicionar mercado", async () => {
    render(
      <BrowserRouter>
        <MercadosPage />
      </BrowserRouter>
    );

    const nomeInput = screen.getByPlaceholderText("Nome do mercado");
    const addButton = screen.getByText("Adicionar");

    fireEvent.change(nomeInput, { target: { value: "Novo Mercado" } });
    fireEvent.click(addButton);

    expect(mockedApi.post).toHaveBeenCalledWith("/markets/", {
      name: "Novo Mercado",
    });
  });
});
