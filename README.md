# MataNova

Sistema de gestão de doações para a ONG MataNova.  
Projeto Integrador Extensionista II (ADS).

Cadastro de doadores, registro de doações com itens e login de voluntário.  
Roda em ambiente local: frontend com Vite+, API com Node.js e Express, banco MySQL ou MariaDB.

## Pré-requisitos

- Node.js 22 ou mais recente
- Vite+ (`vp`), instalado conforme https://viteplus.dev/guide/
- MySQL 8 ou MariaDB 10.6 (ou mais recentes) rodando na máquina
- Git

## Como rodar

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/murilofaculdadeinfo-commits/MataNova.git
   cd MataNova
   ```

2. Instale as dependências:

   ```
   vp install
   ```

3. Crie o banco e os dados de exemplo. No cliente do MySQL (`mysql -u root -p`):

   ```
   SOURCE database/schema.sql;
   SOURCE database/seed.sql;
   ```

   Também funciona abrindo os dois arquivos, nessa ordem, no Workbench, HeidiSQL ou DBeaver.

4. Copie `.env.example` para `.env` e preencha a senha do banco e o `JWT_SECRET`:

   ```
   cp .env.example .env
   ```

   No Windows (PowerShell): `Copy-Item .env.example .env`

5. Em um terminal, inicie a API:

   ```
   vp run api
   ```

6. Em outro terminal, inicie o frontend:

   ```
   vp dev
   ```

7. Abra http://localhost:5173 e entre com o usuário de demonstração.

## Usuário de demonstração

| E-mail                           | Senha       |
| -------------------------------- | ----------- |
| MataNova@meioambiente.ong.com.br | MataNova123 |

Para trocar a senha, gere um novo hash com `node server/gerar-hash.js NOVA_SENHA`
e substitua o valor de `senha_hash` no `database/seed.sql`.

## Variáveis de ambiente

| Variável                 | Para que serve                                           |
| ------------------------ | -------------------------------------------------------- |
| `PORT`                   | Porta da API (padrão 3000)                               |
| `DB_HOST`, `DB_PORT`     | Endereço do banco. Use `127.0.0.1` em vez de `localhost` |
| `DB_USER`, `DB_PASSWORD` | Usuário e senha do banco                                 |
| `DB_NAME`                | Nome do banco (`conectadoa`)                             |
| `JWT_SECRET`             | Segredo que assina os tokens de login                    |
| `JWT_EXPIRES_IN`         | Validade do token (padrão `8h`)                          |

## Rotas da API

| Método           | Rota              | Token? |
| ---------------- | ----------------- | ------ |
| GET              | /api/health       | não    |
| POST             | /api/auth/login   | não    |
| GET, POST        | /api/doadores     | sim    |
| GET, PUT, DELETE | /api/doadores/:id | sim    |
| GET              | /api/itens        | sim    |
| GET, POST        | /api/doacoes      | sim    |

O contrato completo está em `openapi.yaml`. Testes manuais em `api.http`.

## Backup do banco

```
mysqldump -u root -p MataNova > backup.sql
```

Para restaurar: `mysql -u root -p MataNova < backup.sql`
(no PowerShell: `Get-Content backup.sql | mysql -u root -p MataNova`).

## Estrutura

```
database/   schema.sql e seed.sql
server/     API Express (index.js, db.js, auth.js, validacao.js, routes/)
src/        frontend (main.js, api.js, ui.js, pages/, style.css)
```
