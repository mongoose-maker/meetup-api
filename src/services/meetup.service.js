import { Op } from "sequelize";
import Meetup from "../models/meetup.model.js";

export function getAll({ tags, sort, page = 1, limit = 10 } = {}) {
  const where = tags?.length ? { tags: { [Op.overlap]: tags } } : undefined;
  const sortable = ["title", "date", "location", "cratedAt"];
  const key = (sort ?? "").replace(/^-/, "");
  const order = sortable.includes(key)
    ? [[key, sort?.startsWith("-") ? "DESC" : "ASC"]]
    : [["createdAt", "DESC"]];
  const lim = Math.min(+limit || 10, 100);
  const pages = Math.max(+page || 1, 1);
  return Meetup.findAndCountAll({
    where,
    order,
    limit: lim,
    offset: (pages - 1) * limit,
    raw: true,
  });
}

export const getById = async (id) => {
  return await Meetup.findByPk(id, { raw: true });
};

export const create = async (data) => {
  const row = await Meetup.create(data);
  return row.get({ plain: true });
};

export const update = async (data, id) => {
  const [rowsAffected, [row]] = await Meetup.update(data, {
    where: { id },
    returning: true,
  });
  return rowsAffected ? row[0].get({ plain: true }) : null;
};

export const remove = async (id) => {
  const deleted = await Meetup.destroy({ where: { id } });
  return deleted > 0;
};
