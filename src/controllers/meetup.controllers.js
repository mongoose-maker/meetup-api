import meetupModel from "../models/meetup.model.js";
import {
  meetupSchema,
  updateMeetupSchema,
  idSchema,
} from "../validators/meetup.validators.js";

/* ------------------------- GET /api/meetups ------------------------- */
const getAllMeetups = async (req, res) => {
  try {
    // query‑строка: /api/meetups?tags=js,async&sort=-date&page=2&limit=5
    const { tags, sort, page = 1, limit = 10 } = req.query;

    // Все митапы из базы
    let results = await meetupModel.getAll();

    /* ---- фильтрация по нескольким тегам (регистр игнорируем) ---- */
    if (tags) {
      const tagList = tags
        .toLowerCase()
        .split(",")
        .map((t) => t.trim());
      results = results.filter((m) =>
        m.tags.some((tag) => tagList.includes(tag.toLowerCase()))
      );
    }

    /* ---------------------- сортировка --------------------------- */
    if (sort) {
      const isDesc = sort.startsWith("-");
      const key = isDesc ? sort.slice(1) : sort;

      results.sort((a, b) => {
        let aVal = a[key];
        let bVal = b[key];

        if (key === "date") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }

        if (typeof aVal === "string") {
          return isDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        }
        return isDesc ? bVal - aVal : aVal - bVal;
      });
    }

    /* ---------------------- пагинация ---------------------------- */
    const p = parseInt(page, 10);
    const l = parseInt(limit, 10);
    const start = (p - 1) * l;
    const data = results.slice(start, start + l);

    res.json({
      total: results.length,
      page: p,
      limit: l,
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

/* -------------------- GET /api/meetups/:id ------------------------- */
const getMeetupById = async (req, res) => {
  const id = Number(req.params.id);
  const { error } = idSchema.validate(id);
  if (error) return res.status(400).json({ message: "Некорректный ID" });

  try {
    const meetup = await meetupModel.getById(id);
    if (!meetup) return res.status(404).json({ message: "Митап не найден" });
    res.json(meetup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

/* --------------------- POST /api/meetups --------------------------- */
const createMeetup = async (req, res) => {
  const { error, value } = meetupSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newMeetup = await meetupModel.create(value);
    res.status(201).json(newMeetup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

/* ------------------- PUT /api/meetups/:id -------------------------- */
const updateMeetup = async (req, res) => {
  const id = Number(req.params.id);
  const { error: idErr } = idSchema.validate(id);
  if (idErr) return res.status(400).json({ message: "Некорректный ID" });

  const { error: bodyErr, value } = updateMeetupSchema.validate(req.body);
  if (bodyErr)
    return res.status(400).json({ message: bodyErr.details[0].message });

  try {
    const updated = await meetupModel.update(id, value);
    if (!updated) return res.status(404).json({ message: "Митап не найден" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

/* ----------------- DELETE /api/meetups/:id ------------------------- */
const deleteMeetup = async (req, res) => {
  const id = Number(req.params.id);
  const { error } = idSchema.validate(id);
  if (error) return res.status(400).json({ message: "Некорректный ID" });

  try {
    const removed = await meetupModel.remove(id);
    if (!removed) return res.status(404).json({ message: "Митап не найден" });
    res.json({ message: "Митап удалён" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

/* ------------------------- export --------------------------------- */
export default {
  getAllMeetups,
  getMeetupById,
  createMeetup,
  updateMeetup,
  deleteMeetup,
};
