# 🎮 GameLibrary API 

Bem-vindo ao **GameLibrary API**. Este é um sistema de gerenciamento de coleções de jogos, desenvolvido com foco em segurança, escalabilidade e integração com APIs externas.

## 🚀 Sobre o Projeto

O projeto nasceu da necessidade de centralizar e organizar bibliotecas de jogos de diversas plataformas. Ele permite que o usuário crie uma conta, autentique-se com segurança e gerencie sua própria coleção (em desenvolvimento).

### 🛠️ Tecnologias Utilizadas

- **Linguagem:** Java 24 (Preview features/Latest)
- **Framework:** Spring Boot 3.4.x
- **Segurança:** Spring Security + JWT 
- **Banco de Dados:** PostgreSQL
- **Persistência:** Spring Data JPA / Hibernate
- **Validação:** Bean Validation (Hibernate Validator)

## 🔐 Camada de Segurança

A segurança é o pilar central desta API. Atualmente, o sistema conta com:
- **BCrypt Hashing:** Senhas nunca são salvas em texto puro.
- **Autenticação Stateless:** Utilização de JWT para controle de acesso sem estado no servidor.
- **Filtros de Segurança:** Implementação de `OncePerRequestFilter` para validação de tokens em tempo real.

## 📍 Endpoints Principais

| Método | Endpoint | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/users` | Cadastro de novo usuário | Público |
| POST | `/api/v1/auth/login` | Autenticação e geração de Token | Público |
| GET | `/api/v1/users` | Listagem de usuários | Protegido (JWT) |

## 🏗️ Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Teuslp/game-library.git
