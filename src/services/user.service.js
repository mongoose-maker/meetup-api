import User from "../models/user.model.js";

export const create = (data) => {
  return User.create(data, {
    attributes: { exclude: ["password"] },
  });
};

export const findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

export const findById = (id) => {
  return User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
};
