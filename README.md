# 🛒 AppPesquisaMarket

O **AppPesquisaMarket** é uma plataforma desenvolvida para auxiliar consumidores a **encontrarem os melhores preços de produtos em mercados locais**. A aplicação permite o registro de preços, produtos, mercados e localização, possibilitando ao usuário comparar preços e tomar decisões de compra mais econômicas com base em dados colaborativos.

---

## 🎯 Objetivo

Promover economia para os usuários ao facilitar a comparação de preços de itens em diferentes mercados, com base na localização e dados atualizados pela comunidade.

---

## 🧩 Tecnologias Utilizadas

### Backend
- [FastAPI](https://fastapi.tiangolo.com/) (Python)
- SQLAlchemy ORM
- Alembic (migrations)
- MySQL
- JWT (autenticação)
- Pydantic (validações)
- Docker (em andamento)

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- Tailwind CSS
- React Router
- Axios
- React Hook Form + Yup (validação de formulários)
- JWT Decode

---

## 🗂️ Estrutura de Diretórios
AppPesquisaMarket/
├── backend/
│ ├── app/
│ │ ├── crud/
│ │ ├── database/
│ │ ├── models/
│ │ ├── routers/
│ │ ├── schemas/
│ │ └── services/
│ ├── main.py
│ └── requirements.txt
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── services/
│ │ └── App.jsx
│ └── vite.config.js



---

## 🔐 Funcionalidades (Principais)

- ✅ Autenticação com JWT
- ✅ Cadastro de usuários
- ✅ Cadastro e listagem de produtos, marcas e categorias
- ✅ Registro de preços por local
- ✅ Cadastro de mercados e localização (com base em coordenadas)
- ✅ Proteção de rotas via token
- ✅ Integração frontend + backend

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- MySQL
- [Poetry](https://python-poetry.org/) (opcional, se quiser usar)
- Docker (para futura versão containerizada)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou .\venv\Scripts\activate no Windows
pip install -r requirements.txt
uvicorn app.main:app --reload


API disponível em: http://localhost:8000/docs

Frontend
cd frontend
npm install
npm run dev
Frontend disponível em: http://localhost:5173


🧪 Funcionalidades de Teste
Autenticação (login/logout)

Registro de produtos e preços

Dashboard com filtros e gráficos (em andamento)

Verificação de email existente em tempo real

Integração com API protegida por token

📈 Futuras Melhorias
Integração de mapa para localização dos mercados

Notificações de alerta de preços

Ranking de produtos por economia

Deploy com Docker (Render + Vercel)

Aplicativo mobile com Flutter ou React Native

🧑‍💻 Autor
Desenvolvido por Benny Lopes

📄 Licença
Projeto com fins educacionais e comunitários. Licenciado sob MIT License.
