# Meetup API

REST API для управления митапами: регистрация пользователей, JWT‑логин, CRUD митапов.

## 📦 Стек

- Node.js + Express
- PostgreSQL 14
- Passport JWT
- Joi (валидация)
- dotenv

---

## ⚙️ Установка и запуск

```bash
git clone https://github.com/mongoose-maker/meetup-api.git
cd meetup-api
npm install                # или yarn
npm run dev                # nodemon
# Сервер: http://localhost:3000



| Скрипт | Команда                | Назначение |
| ------ | ---------------------- | ---------- |
| dev    | `nodemon src/index.js` | hot‑reload |
| start  | `node src/index.js`    | prod‑режим |




# База данных PostgreSQL

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=meetup_db

# JWT

JWT_SECRET=super_secret_key
```
