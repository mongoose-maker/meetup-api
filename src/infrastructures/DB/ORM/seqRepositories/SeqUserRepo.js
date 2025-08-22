import { UserRepository } from "../../../../core/repositories/user.repository.js";
import UserModel from "../../ORM/SeqModel/seq.UserModel.js";
import { User } from "../../../../core/models/user.model.js";

export class SequelizeUserRepository extends UserRepository {
  _toDomain(userData) {
    if (!userData) return null;
    return new User(
      userData.id,
      userData.username,
      userData.email,
      userData.password,
      userData.role
    );
  }

  async create(data) {
    const user = await UserModel.create(data);
    return this._toDomain(user.get({ plain: true }));
  }

  async findByEmail(email) {
    const userData = await UserModel.findOne({ where: { email }, raw: true });
    return this._toDomain(userData);
  }

  async findById(id) {
    const userData = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      raw: true,
    });
    return this._toDomain(userData);
  }
}
