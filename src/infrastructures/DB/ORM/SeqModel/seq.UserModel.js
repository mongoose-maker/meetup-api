import sequelize from "../../db.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../../../config/constants.js";

class SeqUser extends Model {
  async comparePassword(variant) {
    return bcrypt.compare(variant, this.password);
  }
}
SeqUser.init(
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

SeqUser.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
});
SeqUser.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, BCRYPT_ROUNDS);
  }
});

export default SeqUser;
