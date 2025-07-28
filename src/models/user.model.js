import pool from "../config/db.js";
import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../config/constants.js";

const create = async ({ username, email, password, role = "user" }) => {
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const { rows } = await pool.query(
    `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
    [username, email, hash, role]
  );

  return rows[0];
};

const findByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

const findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, username, email, role FROM users WHERE id = $1",
    [id]
  );
  return rows[0];
};

const comparePassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

export default { create, findByEmail, findById, comparePassword };
