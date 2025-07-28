// Создаем список всех наших митапов (На данный момент эти данные будут хранится не в БД, а в Оперативной памяти)

// let meetups = [
//   {
//     id: 1,
//     title: "Core JS",
//     description: "Discussion the main rules JS",
//     tags: ["JS", "variables", "types"],
//     date: "2025-07-01T19:00:00",
//     location: "C1",
//   },
// ];

// module.exports = {
//   getAll: () => meetups,
//   getById: (id) => meetups.find((m) => m.id === id),
//   create: (data) => {
//     const newMeetup = { id: Date.now(), ...data };
//     meetups.push(newMeetup);
//     return newMeetup;
//   },
//   update: (id, data) => {
//     const index = meetups.findIndex((m) => m.id === id);
//     if (index === -1) return null;
//     meetups[index] = { ...meetups[index], ...data };
//     return meetups[index];
//   },
//   remove: (id) => {
//     const index = meetups.findIndex((m) => m.id === id);
//     if (index === -1) return false;
//     meetups.splice(index, 1);
//     return true;
//   },
// };

const pool = require("../config/db");

module.exports = {
  async getAll() {
    const { rows } = await pool.query("SELECT * FROM meetups");
    return rows;
  },
  async getById(id) {
    const { rows } = await pool.query("SELECT * FROM meetups Where id =$1", [
      id,
    ]);
    return rows[0];
  },
  async create(data) {
    const { title, description, tags, date, location } = data;
    const { rows } = await pool.query(
      `INSERT INTO meetups (title, description, tags, date, location)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description, tags, date, location]
    );
    return rows[0];
  },
  async update(id, data) {
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
  },
  async remove(id) {
    const { rowCount } = await pool.query("DELETE FROM meetups WHERE id = $1", [
      id,
    ]);
    return rowCount > 0;
  },
};
