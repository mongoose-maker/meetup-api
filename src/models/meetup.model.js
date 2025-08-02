import sequelize from "../config/db.js";
import { DataTypes, Model } from "sequelize";

class Meetup extends Model {}

Meetup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "meetups",
    timestamps: true,
  }
);

export const getAll = async () => {
  return await Meetup.findAll({ raw: true });
};
export const getById = async (id) => {
  return await Meetup.findByPk(id, { raw: true });
};
export const create = async (data) => {
  const row = await Meetup.create(data, { raw: true });
  return row;
};
export const update = async (id, data) => {
  const [rowsAffected, [row]] = await Meetup.update(data, {
    where: { id },
    returning: true,
  });
  return rowsAffected ? row.get({ plain: true }) : null;
};
export const remove = async (id) => {
  const deleted = Meetup.destroy({ where: { id } });
  return deleted > 0;
};

export default Meetup;
