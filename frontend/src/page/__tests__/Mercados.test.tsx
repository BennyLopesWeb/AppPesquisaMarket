// src/pages/__tests__/Mercados.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MercadosPage from "../Mercados";
import api from "../../services/api";

jest.mock("../../services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("MercadosPage", () => {
  beforeEach(() => {
    mockedApi.get.mockResolvedValue({ data: [] });
  });

  it("deve renderizar mercados", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [{ id: 1, name: "Mercado Central" }],
    });
    render(<MercadosPage />);
    await waitFor(() => {
      expect(screen.getByText("Mercado Central")).toBeInTheDocument();
    });
  });

  it("deve adicionar novo mercado", async () => {
    render(<MercadosPage />);
    const input = screen.getByPlaceholderText("Nome do mercado");
    fireEvent.change(input, { target: { value: "Novo Mercado" } });
    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith("/markets/", {
        name: "Novo Mercado",
      });
    });
  });

  it("deve excluir mercado", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [{ id: 1, name: "Mercado A" }],
    });
    render(<MercadosPage />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Excluir"));
    });
    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalledWith("/markets/1");
    });
  });
});
