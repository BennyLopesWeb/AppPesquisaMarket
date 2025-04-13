#!/bin/bash

# Aguarda o banco de dados estar pronto (opcional, se necessário)
# echo "Aguardando banco de dados..."
# sleep 10

# Inicia o servidor FastAPI com Uvicorn
exec uvicorn app.main:app --host 0.0.0.0 --port 10000
