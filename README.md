# Mind Blog – Frontend

Frontend do projeto **Mind Blog**, desenvolvido em React.

## 🖥️ Tecnologias
- React
- Vite
- Axios
- React Router
- CSS puro

## 🚀 Funcionalidades
- Listagem de artigos
- Visualização de artigo
- Comentários
- Login e cadastro
- Upload de imagem
- Perfil do usuário

## ▶️ Como rodar o projeto

npm install
npm run dev
A aplicação estará disponível em:

http://localhost:5173
🔗 Backend
Este frontend consome a API disponível em:

http://localhost:3333

---

## ✍️ README BACKEND — MODELO

# Mind Blog – Backend

API REST do projeto **Mind Blog**.

## 🛠️ Tecnologias
- Node.js
- Express
- TypeScript
- MySQL
- JWT
- Multer

## 🚀 Funcionalidades
- Autenticação com JWT
- CRUD de usuários
- CRUD de artigos
- Upload de imagens
- Comentários em artigos

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env`:

PORT=3333
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mind_blog
JWT_SECRET=sua_chave_secreta
▶️ Como rodar
npm install
npm run dev
Servidor rodando em:

http://localhost:3333
📌 Rotas principais
POST /auth/login

POST /auth/register

GET /posts

POST /posts

POST /posts/:id/comments
