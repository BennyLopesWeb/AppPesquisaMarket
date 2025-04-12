# AppPesquisaMarket

Aplicativo cooperativo para compartilhamento de preços em mercados e supermercados da Costa Ocidental da África.

## ✨ Visão Geral

A plataforma permite que usuários compartilhem e encontrem os melhores preços em produtos de diversos mercados locais, promovendo economia e colaboração comunitária.

## ⚙️ Tecnologias Utilizadas

- **Backend:** FastAPI + SQLAlchemy
- **Banco de Dados:** SQLite (dev) / MySQL (produção)
- **Autenticação:** JWT (com senha criptografada - bcrypt)
- **Migrations:** Alembic
- **Frontend:** React + TailwindCSS (em desenvolvimento)
- **Futuro Mobile:** Flutter ou React Native

## 📁 Estrutura do Projeto

```
app/
├── crud/               # Funções CRUD para cada modelo
├── database/           # Conexão com o banco e inicialização
├── models/             # Modelos SQLAlchemy (User, Product, Market...)
├── routers/            # Rotas FastAPI por recurso (/users, /products...)
├── schemas/            # Schemas Pydantic (validação e serialização)
├── core/               # Segurança e utilitários (ex: JWT, senhas)
├── main.py             # Ponto de entrada da aplicação FastAPI
```

## 🔐 Autenticação

- Registro de usuário com senha criptografada (bcrypt)
- Login com OAuth2PasswordRequestForm
- Proteção de rotas com dependência `get_current_user`

## ▶️ Rodando Localmente

### Pré-requisitos
- Python 3.11+
- Virtualenv ou venv

```bash
# Crie e ative o ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate    # Windows

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
uvicorn app.main:app --reload
```

### Banco de Dados (SQLite)
```bash
# Criar estrutura inicial
python app/database/create_db.py

# Ou use alembic para migrations
alembic revision --autogenerate -m "initial"
alembic upgrade head
```

## 🔄 Endpoints Importantes

- POST `/users/` → Criação de usuário
- POST `/login` → Autenticação e geração do token JWT
- GET `/products/` → Listar produtos (autenticado)
- GET `/me` → Dados do usuário autenticado

## 📌 To-do
- [x] Autenticação com senha criptografada
- [x] CRUD completo para usuários, produtos, preços, mercados e localização
- [ ] Integração frontend com API
- [ ] Aplicativo mobile com Flutter ou React Native

---

Desenvolvido com 💙 para empoderar comunidades locais!
