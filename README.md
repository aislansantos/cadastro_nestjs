# Cadastro NestJs

Projeto de cadastro, que visa melhorar projeto ja executado em NodeJs e ExpressJs, por um projeto feito em NestJs, melhorando a estrutua do projeto, criando uma estrutura mais organizada.

## Tecnologias ultilizadas

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

### Retorna lista de usuários

```http
  GET /api/users/
```

### Retorna um usuário

```http
  GET /api/users/:id
```

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |

### Cria um usuário

```http
  GET /api/users/:id
```

| Parâmetro | Tipo     | Descrição                                      |
| :-------- | :------- | :--------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |
