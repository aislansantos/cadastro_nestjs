# Controle Estoque

Projeto de controle de estoque, que visa melhorar projeto ja executado em NodeJs e ExpressJs, por um projeto feito em NestJs, melhorando a estrutua do projeto, criando uma estrutura mais organizada.

### Problema apresentado

O principal problema proposto pelo app, é fazer um controle simples de compra e venda de produtos, otimizando o gasto com produto par não haver um estoque inflado, bem como não haver falta de produto para venda.

### Tecnologias ultilizadas

- TypeScript
- NodeJs
- NestJs
- Prisma ORM
- MySql

## Instalação

Instale projeto com npm

```bash
  npm install
```

## Documentação da API

### Swagger

```http
  GET /api/docs
```

Mostra o Swagger monstrando todos os endpoint bem como testalos.

### Rotas de usuários

#### Retorna lista de usuários

```http
  GET /api/users/
```

---

#### Retorna um usuário

```http
  GET /api/users/:id
```

| Parâmetro | Tipo     | Descrição                                                         |
| :-------- | :------- | :---------------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer selcionar os dados |

---

#### Cria um usuário

```http
  POST /api/users
```

| Parâmetro  | Tipo     | Descrição                                               |
| :--------- | :------- | :------------------------------------------------------ |
| `status`   | `string` | 'ativo'/'inativo' > inicia como ativo se não informado. |
| `name`     | `string` | **Obrigatório** - Nome                                  |
| `email`    | `string` | **Obrigatório** - E-mail                                |
| `password` | `string` | **Obrigatório** - Password                              |
| `birthAt`  | `date`   | Data de nascimento                                      |

---

#### Edita um usuário

```http
  PATCH /api/users/:id
```

| Parâmetro | Tipo     | Descrição                                             |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer editar |

| Dados      | Tipo     | Descrição          |
| :--------- | :------- | :----------------- |
| `status`   | `string` | 'ativo'/'inativo'  |
| `name`     | `string` | Nome               |
| `email`    | `string` | E-mail             |
| `password` | `string` | Senha              |
| `birthAt`  | `date`   | Data de nascimento |

---

#### Remove um usuário

```http
  DELETE /api/users/:id
```

| Parâmetro | Tipo     | Descrição                                              |
| :-------- | :------- | :----------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer deletar |

### Rotas de clientes

#### Retorna lista de clientes

```http
  GET /api/customers
```

---

#### Retorna um cliente

```http
  GET /api/customers/:id
```

| Parâmetro | Tipo     | Descrição                                                          |
| :-------- | :------- | :----------------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do cliente que você quer selecionar os dados |

---

#### Cria um cliente

```http
 POST /api/customers
```

| Parâmetro  | Tipo     | Descrição                                               |
| :--------- | :------- | :------------------------------------------------------ |
| `status`   | `string` | 'ativo'/'inativo' > inicia como ativo se não informado. |
| `name`     | `string` | **Obrigatório** - Nome                                  |
| `lastname` | `string` | **Obrigatório** - Sobrenome                             |
| `email`    | `string` | **Obrigatório** - E-mail                                |
| `city`     | `string` | **Obrigatório** - Cidade de residência                  |

---

#### Edita um cliente

```http
 PATCH /api/customers
```

| Parâmetro | Tipo     | Descrição                                             |
| :-------- | :------- | :---------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do cliente que você quer editar |

| Dados      | Tipo     | Descrição            |
| :--------- | :------- | :------------------- |
| `status`   | `string` | 'ativo'/'inativo'    |
| `name`     | `string` | Nome                 |
| `lastname` | `string` | Sobrenome            |
| `email`    | `string` | E-mai                |
| `city`     | `string` | Cidade de residência |

---

#### Remove um cliente

```http
 DELETE /api/customers
```

| Parâmetro | Tipo     | Descrição                                              |
| :-------- | :------- | :----------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do cliente que você quer deletar |

### Rotas de vendedores

#### Retorna lista de vendedores

```http
  GET /api/sellers
```

---

#### Retorna um vendedor

```http
  GET /api/sellers/:id
```

| Parâmetro | Tipo     | Descrição                                                           |
| :-------- | :------- | :------------------------------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do vendedor que você quer selecionar os dados |

---

#### Cria um vendedor

```http
 POST /api/sellers
```

| Parâmetro | Tipo     | Descrição                                               |
| :-------- | :------- | :------------------------------------------------------ |
| `status`  | `string` | 'ativo'/'inativo' > inicia como ativo se não informado. |
| `name`    | `string` | **Obrigatório** - Nome                                  |
| `email`   | `string` | **Obrigatório** - E-mail                                |

---

#### Edita um vendedor

```http
 PATCH /api/sellers
```

| Parâmetro | Tipo     | Descrição                                              |
| :-------- | :------- | :----------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do vendedor que você quer editar |

| Dados    | Tipo     | Descrição                                               |
| :------- | :------- | :------------------------------------------------------ |
| `status` | `string` | 'ativo'/'inativo' > inicia como ativo se não informado. |
| `name`   | `string` | Nome                                                    |
| `email`  | `string` | E-mail                                                  |

---

#### Remove um vendedor

```http
 DELETE /api/sellers
```

| Parâmetro | Tipo     | Descrição                                               |
| :-------- | :------- | :------------------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do vendedor que você quer deletar |

...
