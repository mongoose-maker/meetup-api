// const pool = require("../config/db");
// const bcrypt = require("bcrypt");

// // 1. Создаем пользователя ( регистрацию )

// module.exports = {
//   async create({ username, email, password }) {
//     module.exports = {
//         // 1. Регистрация
//     async create ({username,email,password, role = 'user'})
//     }
//     const hash = await bcrypt.hash(password, 10);
//     const { rows } = await pool.query(
//       `INSERT INTO users (username, email, password, role)
//         VALUES ($1,$2,$3,$4)
//         RETURNING id, username, email, role`,
//       [username, email, hash, role]
//     );
//     return rows[0];
//   },

//   // 2. Ищем по email (для логина)

//   async findByEmail(email) {
//     const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     return rows[0];
//   },

//   // 3. Ищем по id (для Passport)

//   async findById(id) {
//     const { rows } = await pool.query(
//       "SELECT id, username, email FROM users WHERE id = $1",
//       [id]
//     );
//     return rows[0];
//   },

//   // 4. проверка пароля

//   async comparePassword(plain, hash) {
//     return bcrypt.compare(plain, hash);
//   },
// };

// src/models/user.model.js
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// ───────────────────────────────────────────────────────────
//  Модель пользователя: create, findByEmail, findById, comparePassword
// ───────────────────────────────────────────────────────────
module.exports = {
  /* 1. Регистрация ─ создаём пользователя, по умолчанию role = 'user' */
  async create({ username, email, password, role = "user" }) {
    // хешируем пароль перед сохранением
    const hash = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
      [username, email, hash, role]
    );

    return rows[0]; // отдаём созданного пользователя (без пароля)
  },

  /* 2. Найти пользователя по email (нужно для логина) */
  async findByEmail(email) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return rows[0];
  },

  /* 3. Найти пользователя по id (использует Passport-JWT) */
  async findById(id) {
    const { rows } = await pool.query(
      "SELECT id, username, email, role FROM users WHERE id = $1",
      [id]
    );
    return rows[0];
  },

  /* 4. Проверка пароля при логине */
  async comparePassword(plain, hash) {
    return bcrypt.compare(plain, hash);
  },
};
