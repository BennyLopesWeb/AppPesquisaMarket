// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Estilos globais, incluindo Tailwind

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Elemento root não encontrado");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


fetch("http://localhost:8000/api/ping")
  .then(res => res.json())
  .then(data => console.log(data.message))
  .catch(err => console.error("Erro ao conectar com o backend:", err));




import React from "react";
import Ping from "./components/Ping";

function App() {
  return (
    <div className="App">
      <Ping />
    </div>
  );
}

export default App;

