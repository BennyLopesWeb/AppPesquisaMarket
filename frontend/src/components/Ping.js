// src/components/Ping.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Ping = () => {
  const [status, setStatus] = useState("Checando backend...");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ping")
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((err) => {
        setError("Erro ao conectar com o backend.");
        console.error(err);
      });
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Status do Backend</h2>
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-green-600">{status}</p>
      )}
    </div>
  );
};

export default Ping;
