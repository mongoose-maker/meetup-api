import { Op } from "sequelize";
import { MeetupRepository } from "../../../../core/repositories/meetup.repository.js";
import MeetupModel from "../../ORM/SeqModel/seq.MeetupModel.js";
// Импортируем доменную модель для маппинга!
import { Meetup } from "../../../../core/models/meetup.model.js";

export class SequelizeMeetupRepository extends MeetupRepository {
  // Приватный метод-маппер для преобразования данных из БД в доменную модель
  _toDomain(meetupData) {
    if (!meetupData) return null;
    return new Meetup(
      meetupData.id,
      meetupData.title,
      meetupData.description,
      meetupData.tags,
      meetupData.date,
      meetupData.location
    );
  }

  async getAll({ tags, sort, page = 1, limit = 10 } = {}) {
    const where = tags?.length ? { tags: { [Op.overlap]: tags } } : undefined;
    const sortable = ["title", "date", "location", "createdAt"];
    const key = (sort ?? "").replace(/^-/, "");
    const order = sortable.includes(key)
      ? [[key, sort?.startsWith("-") ? "DESC" : "ASC"]]
      : [["createdAt", "DESC"]];
    const lim = Math.min(+limit || 10, 100);
    const pages = Math.max(+page || 1, 1);

    const { count, rows } = await MeetupModel.findAndCountAll({
      where,
      order,
      limit: lim,
      offset: (pages - 1) * limit,
      raw: true,
    });

    // Преобразуем каждый элемент массива в доменную модель
    return { count, rows: rows.map(this._toDomain) };
  }

  async getById(id) {
    const meetupData = await MeetupModel.findByPk(id, { raw: true });
    // Возвращаем экземпляр доменной модели
    return this._toDomain(meetupData);
  }

  async create(data) {
    const row = await MeetupModel.create(data);
    // Возвращаем экземпляр доменной модели
    return this._toDomain(row.get({ plain: true }));
  }

  async update(id, data) {
    const [rowsAffected, [row]] = await MeetupModel.update(data, {
      where: { id },
      returning: true,
    });
    // Возвращаем экземпляр доменной модели
    return rowsAffected ? this._toDomain(row.get({ plain: true })) : null;
  }

  async remove(id) {
    const deleted = await MeetupModel.destroy({ where: { id } });
    return deleted > 0;
  }
}
