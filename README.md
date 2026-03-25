# PaymentFlow

Sistema de **gestão e autorização de pagamentos** desenvolvido como avaliação técnica.
O sistema permite registrar pagamentos, autorizar ou rejeitar solicitações e consultar o histórico de registros, respeitando regras de permissão baseadas em perfis de usuário (RBAC).

---

# Visão Geral

O sistema possui três principais tipos de usuários:

* **Registro** → registra pagamentos
* **Autorização** → autoriza ou rejeita pagamentos
* **Administração** → acesso total ao sistema

O fluxo principal do sistema é:

```
Registro de Pagamento
        ↓
Status: Pendente
        ↓
Autorizador analisa
   ↓           ↓
Autoriza    Rejeita
```

Se rejeitado, o solicitante pode visualizar o **motivo da rejeição**.

---

# Arquitetura

O sistema é dividido em dois serviços principais:

```
Frontend (React + Vite + TypeScript)
        ↓
API REST
        ↓
Backend (NestJS + TypeScript)
        ↓
Banco de dados
        ↓
MySQL
```

### Tecnologias utilizadas

**Frontend**

* React
* TypeScript
* Vite
* Axios
* React Router

**Backend**

* Node.js
* NestJS
* TypeScript
* JWT Authentication
* RBAC (Role Based Access Control)

**Banco de Dados**

* MySQL

---

# Estrutura do Projeto

```
paymentflow
│
├── backend
│   └── API REST (NestJS)
│
├── frontend
│   └── Aplicação Web (React)
│
├── database
│   └── scripts SQL / migrations
│
└── README.md
```

Cada serviço possui sua própria documentação:

* 📦 Backend → `/backend/README.md`
* 🎨 Frontend → `/frontend/README.md`

---

# Como Rodar o Projeto

## 1 - Clonar o repositório

```
git clone https://github.com/seu-usuario/paymentflow.git
cd paymentflow
```

---

## 2 - Executar projeto

Obtenda o .env com o nosso time de desenvolvimento e execute o seguinte comando:

```bash
docker compose up -d --build
```


---

# Padrão de Branch

Utilizamos uma estratégia simplificada inspirada no **GitFlow**.

Branches principais:

```
main
develop
```

Branches de desenvolvimento:

```
feature/nome-da-feature
fix/nome-do-bug
chore/tarefa-interna
```

Exemplos:

```
feature/login-page
feature/payment-registration
fix/payment-validation
```

Fluxo de trabalho:

```
develop
   ↓
feature/*
   ↓
pull request
   ↓
develop
   ↓
main (release)
```

---

# Padrão de Commit

Utilizamos o padrão **Conventional Commits**.

Formato:

```
tipo: descrição
```

Tipos principais:

```
feat: nova funcionalidade
fix: correção de bug
refactor: refatoração
style: mudanças de estilo
docs: documentação
test: testes
chore: tarefas internas
```

Exemplos:

```
feat: implement login endpoint
feat: create payment registration page
fix: validation for payment value
refactor: improve authorization service
docs: update backend readme
```

---

# Controle de Acesso (RBAC)

Perfis do sistema:

| Perfil        | Permissões                       |
| ------------- | -------------------------------- |
| Registro      | registrar pagamentos             |
| Autorização   | registrar e autorizar pagamentos |
| Administração | acesso total ao sistema          |

O controle de acesso é feito utilizando **JWT + Guards no backend**.

---

# Regras de Negócio

Principais regras implementadas:

* todos os campos são obrigatórios
* pagamentos iniciam com status **Pendente**
* rejeição exige **motivo obrigatório**
* consultas devem respeitar **intervalo de datas válido**
* senhas armazenadas com **hash seguro**
* apenas usuários autenticados podem acessar a API

---

# Usuário Inicial

Após executar o script do banco:

```
Login: admin
Senha: admin123
Perfil: Administração
```

---

# Documentação Específica

Para mais detalhes:

* Backend → `backend/README.md`
* Frontend → `frontend/README.md`

---

# Melhorias Futuras

* Notificações em tempo real
* Testes automatizados
* Docker
* CI/CD
* Logs estruturados
* Monitoramento

---

# Autor

Desenvolvido por **João Pedro Juvino dos Santos**.
