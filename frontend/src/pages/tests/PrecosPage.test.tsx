// src/pages/__tests__/PrecosPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import PrecosPage from "../PrecosPage";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../services/api";

jest.mock("../../services/api");

const mockedApi = api.default as jest.Mocked<typeof api.default>;

describe("PrecosPage", () => {
  beforeEach(() => {
    mockedApi.get.mockResolvedValue({
      data: [
        {
          id: 1,
          price: 10.5,
          product: { name: "Arroz" },
          market: { name: "Supermercado A" },
        },
      ],
    });
  });

  it("deve renderizar lista de preços", async () => {
    render(
      <BrowserRouter>
        <PrecosPage />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Arroz/)).toBeInTheDocument();
    expect(screen.getByText(/Supermercado A/)).toBeInTheDocument();
    expect(screen.getByText("R$ 10.50")).toBeInTheDocument();
  });

  it("deve permitir deletar um preço", async () => {
    render(
      <BrowserRouter>
        <PrecosPage />
      </BrowserRouter>
    );

    const deleteButton = await screen.findByText("Excluir");
    fireEvent.click(deleteButton);

    expect(mockedApi.delete).toHaveBeenCalledWith("/prices/1");
  });
});
