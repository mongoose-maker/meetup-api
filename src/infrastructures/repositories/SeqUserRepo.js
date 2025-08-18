import { UserRepository } from "../../core/repositories/user.repository.js";
import UserModel from "../ORM/sequelize/seq.UserModel.js";
// Импортируем доменную модель для маппинга!
import { User } from "../../core/models/user.model.js";

export class SequelizeUserRepository extends UserRepository {
  // Приватный метод-маппер
  _toDomain(userData) {
    if (!userData) return null;
    return new User(
      userData.id,
      userData.username,
      userData.email,
      userData.password, // Важно передавать пароль для логики в сервисе
      userData.role
    );
  }

  async create(data) {
    const user = await UserModel.create(data);
    // Возвращаем экземпляр доменной модели
    return this._toDomain(user.get({ plain: true }));
  }

  async findByEmail(email) {
    const userData = await UserModel.findOne({ where: { email }, raw: true });
    // Возвращаем экземпляр доменной модели со всеми данными
    return this._toDomain(userData);
  }

  async findById(id) {
    const userData = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      raw: true,
    });
    // Возвращаем экземпляр доменной модели (без пароля)
    return this._toDomain(userData);
  }
}
