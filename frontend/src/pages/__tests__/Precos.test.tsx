// src/pages/__tests__/Precos.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PrecosPage from "../Precos";
import api from "../../services/api";

jest.mock("../../services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("PrecosPage", () => {
  beforeEach(() => {
    mockedApi.get.mockResolvedValue({ data: [] });
  });

  it("deve renderizar lista de preços", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          product: { name: "Arroz" },
          market: { name: "Mercado X" },
          price: 10.5,
        },
      ],
    });
    render(<PrecosPage />);
    await waitFor(() => {
      expect(screen.getByText("Arroz - Mercado X: R$10.5")).toBeInTheDocument();
    });
  });

  it("deve adicionar novo preço", async () => {
    render(<PrecosPage />);
    fireEvent.change(screen.getByPlaceholderText("ID do produto"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByPlaceholderText("ID do mercado"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByPlaceholderText("Preço"), {
      target: { value: "15" },
    });
    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith("/prices/", {
        product_id: 1,
        market_id: 2,
        price: 15,
      });
    });
  });

  it("deve excluir um preço", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        {
          id: 2,
          product: { name: "Feijão" },
          market: { name: "Mercado Y" },
          price: 8,
        },
      ],
    });
    render(<PrecosPage />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Excluir"));
    });
    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalledWith("/prices/2");
    });
  });
});
