// src/models/user.model.js
import pool from "../config/db.js";
import bcrypt from "bcrypt";

// ───────────────────────────────────────────────────────────
//  Модель пользователя: create, findByEmail, findById, comparePassword
// ───────────────────────────────────────────────────────────

/* 1. Регистрация ─ создаём пользователя, по умолчанию role = 'user' */
const create = async ({ username, email, password, role = "user" }) => {
  // хешируем пароль перед сохранением
  const hash = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
    [username, email, hash, role]
  );

  return rows[0]; // отдаём созданного пользователя (без пароля)
};

/* 2. Найти пользователя по email (нужно для логина) */
const findByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

/* 3. Найти пользователя по id (использует Passport-JWT) */
const findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, username, email, role FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
};

/* 4. Проверка пароля при логине */
const comparePassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

export default { create, findByEmail, findById, comparePassword };
