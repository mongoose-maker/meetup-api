import pool from "../config/db.js";

const getAll = async () => {
  const { rows } = await pool.query("SELECT * FROM meetups");
  return rows;
};
const getById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM meetups Where id =$1", [id]);
  return rows[0];
};
const create = async (data) => {
  const { title, description, tags, date, location } = data;
  const { rows } = await pool.query(
    `INSERT INTO meetups (title, description, tags, date, location)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [title, description, tags, date, location]
  );
  return rows[0];
};
const update = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in data) {
    fields.push(`${key} = $${++idx}`);
    values.push(data[key]);
  }
  if (!fields.length) return null;

  values.unshift(id); // id будет $1
  const { rows } = await pool.query(
    `UPDATE meetups SET ${fields.join(", ")} WHERE id = $1 RETURNING *`,
    values
  );
  return rows[0];
};
const remove = async (id) => {
  const { rowCount } = await pool.query("DELETE FROM meetups WHERE id = $1", [
    id,
  ]);
  return rowCount > 0;
};

export default { getAll, getById, create, update, remove };
