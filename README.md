# Loja do Seu Manoel - API de Embalagem de Pedidos
Essa é uma API em **NestJS** que automatiza a escolha das caixas de papelão para pedidos de produtos, considerando suas dimensões.  
Ela inclui **Swagger**, **JWT** para autenticação opcional e pode ser executada com **Docker**.

---

## 🚀 Requisitos

- Node.js >= 20
- NPM >= 9
- Docker (recomendado)
- Navegador para acessar o Swagger

---

## 🏗️ Rodando localmente (sem Docker)

1. **Clone o repositório:**

  ```bash
  git clone <SEU_REPOSITORIO_GIT>
  cd loja-do-seu-manoel
  ```

2. **Instale as dependências:**

  ```bash
  npm install
  ```

3. **Execute a aplicação:**

  ```bash
  npm run start
  # ou
  npm start
  ```

  - API disponível em: [http://localhost:3333](http://localhost:3333)
  - Swagger: [http://localhost:3333/api](http://localhost:3333/api)

---

## 🐳 Rodando com Docker (recomendado)

1. Certifique-se de que o `Dockerfile` está na raiz do projeto.

2. **Build da imagem:**

  ```bash
  docker build -t packing-api .
  ```

3. **Rode o container:**

  ```bash
  docker run -p 3333:3333 packing-api
  ```

  - API disponível em: [http://localhost:3333](http://localhost:3333)
  - Swagger: [http://localhost:3333/api](http://localhost:3333/api)

---

## 🔑 Autenticação JWT (opcional)

1. **Faça login para obter o token:**

  ```
  POST /auth/login
  Content-Type: application/json

  {
    "username": "lojinha-du-emanoel"
  }
  ```

  **Resposta:**
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIs..."
  }
  ```

2. **Use o token no header para acessar endpoints protegidos:**

  ```
  Authorization: Bearer <access_token>
  ```

---

## 📦 Endpoint `/orders/pack`

Calcula a melhor forma de embalar os produtos nas caixas disponíveis.

- **POST** `/orders/pack`
- **Header:** `Authorization: Bearer <token>` (se JWT ativado)
- **Body:** JSON com produtos

**Exemplo de entrada:**
```json
{
  "products": [
   { "id": "p1", "altura": 10, "largura": 10, "comprimento": 10 },
   { "id": "p2", "altura": 20, "largura": 15, "comprimento": 10 },
   { "id": "p3", "altura": 40, "largura": 30, "comprimento": 20 }
  ]
}
```

**Exemplo de saída:**
```json
[
  {
   "caixa": "Caixa Pequena",
   "caixaId": "Caixa 1",
   "produtos": [
    { "id": "p1", "altura": 10, "largura": 10, "comprimento": 10 },
    { "id": "p2", "altura": 20, "largura": 15, "comprimento": 10 }
   ]
  },
  {
   "caixa": "Caixa Média",
   "caixaId": "Caixa 2",
   "produtos": [
    { "id": "p3", "altura": 40, "largura": 30, "comprimento": 20 }
   ]
  }
]
```

---

## ⚠️ Validação de produtos

Se algum produto não couber em nenhuma caixa, a API retorna um erro amigável:

```json
{
  "statusCode": 400,
  "message": "Produto p99 não cabe em nenhuma das caixas disponíveis.",
  "error": "Bad Request"
}
```

---

## 🧪 Testes

Para rodar testes unitários (Vitest):

```bash
npm run test
npm run test:watch
```