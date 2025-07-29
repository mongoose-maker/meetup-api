import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";
import ApiError from "../utils/ApiError.js";

const register = async (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return next(new ApiError(400, error.details[0].message));

  try {
    const exists = await userModel.findByEmail(value.email);
    if (exists) return next(new ApiError(400, "Email уже занят"));

    const newUser = await userModel.create({ ...value, role: "user" });

    return res.status(201).json(newUser);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return next(new ApiError(400, error.details[0].message));

  try {
    const user = await userModel.findByEmail(value.email);
    if (!user) return next(new ApiError(401, "Неверные учётные данные"));

    const ok = await userModel.comparePassword(value.password, user.password);
    if (!ok) return next(new ApiError(401, "Неверные учётные данные"));

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

const me = (req, res) => res.json(req.user);

export default { register, login, me };
