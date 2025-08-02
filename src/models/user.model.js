import sequelize from "../config/db.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../config/constants.js";

class User extends Model {
  async comparePassword(variant) {
    return bcrypt.compare(variant, this.password);
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
});
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
  }
});

export const create = (data) =>
  User.create(data, {
    attributes: { exclude: ["password"] },
  });

export const findByEmail = (email) => User.findOne({ where: { email } });

export const findById = (id) =>
  User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

export default User;
