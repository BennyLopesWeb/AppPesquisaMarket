// src/pages/__tests__/ProtectedPages.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard";
import ProdutosPage from "../ProdutosPage";
import MercadosPage from "../MercadosPage";
import PrecosPage from "../PrecosPage";

const renderWithRouter = (ui: React.ReactNode, token: string | null = null) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }

  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/mercados" element={<MercadosPage />} />
        <Route path="/precos" element={<PrecosPage />} />
      </Routes>
    </BrowserRouter>
  );
};

describe("Páginas protegidas", () => {
  it("redireciona se não houver token", async () => {
    renderWithRouter(<Dashboard />, null);
    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });

  it("permite acesso com token válido", async () => {
    const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjo5OTk5OTk5OTk5fQ.abc123";

    renderWithRouter(<Dashboard />, validToken);
    await waitFor(() => {
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });
  });

  it("acessa Produtos, Mercados e Preços com token válido", async () => {
    const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZXhwIjo5OTk5OTk5OTk5fQ.abc123";

    renderWithRouter(<ProdutosPage />, validToken);
    await waitFor(() => {
      expect(screen.getByText("Produtos")).toBeInTheDocument();
    });

    renderWithRouter(<MercadosPage />, validToken);
    await waitFor(() => {
      expect(screen.getByText("Mercados")).toBeInTheDocument();
    });

    renderWithRouter(<PrecosPage />, validToken);
    await waitFor(() => {
      expect(screen.getByText("Preços")).toBeInTheDocument();
    });
  });
});
