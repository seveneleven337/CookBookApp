# CookBookApp

## Branching Strategy

We use the following branch structure:

- **main**  
  Stable development branch.

- **release**  
  Used for preparing production releases.

- **feature/**  
  New features under development.  
  Example:
  feature/add-recipe-search

- **fix/**  
  Bug fixes for non-critical issues.  
  Example:
  fix/login-validation

- **hotfix/**  
  Critical fixes that need to be applied quickly to production.  
  Example:
  hotfix/security-patch

- **chore/**  
  Maintenance tasks, refactoring, development configuration or tooling updates.  
  Example:
  chore/update-dependencies

---

## Commit Comment Convention

To make commits easier to understand, prefix messages depending on the part of the system you are working on.

### Web Development

web: implement some button

### Authentication

auth-service: implement authentication logic

### Recipe Management Service

recipe-management-service: implement feature

---

## General Guidelines

- Keep commit messages **short and descriptive**.
- Always use the **prefix related to the component** you are modifying.
- Create a new branch using the correct branch type before starting development.

## Docker compose

```bash
docker compose --env-file .env.dev up -d --build
```

## Auth Service

The Auth Service is a standalone microservice responsible for user authentication.

## Recipe Management Service

The Recipe Management Service stores and serves user recipes (PostgreSQL, Express). HTTP routes are mounted at `/api/recipes` (for example `GET /api/recipes?user_id=1`). Health: `GET /health`.
