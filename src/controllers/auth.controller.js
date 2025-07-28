import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";

const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const exists = await userModel.findByEmail(value.email);
    if (exists) return res.status(409).json({ message: "Email уже занят" });

    const newUser = await userModel.create({ ...value, role: "user" });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const user = await userModel.findByEmail(value.email);
    if (!user)
      return res.status(401).json({ message: "Неверные учётные данные" });

    const ok = await userModel.comparePassword(value.password, user.password);
    if (!ok)
      return res.status(401).json({ message: "Неверные учётные данные" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const me = (req, res) => {
  res.json(req.user);
};

export default { register, login, me };
