const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "organizer").default("user"),
  // Клиент не отправляет роль! Роль выставим вручную = 'user
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/* POST /auth/register */
exports.register = async (req, res) => {
  // ① Валидируем вход
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // ② Проверяем, нет ли уже такого e-mail
    const exists = await userModel.findByEmail(value.email);
    if (exists) return res.status(409).json({ message: "Email уже занят" });

    // ③ Создаём пользователя. Роль фиксируем = 'user'
    const newUser = await userModel.create({ ...value, role: "user" });

    // ④ Отдаём готовый объект (без пароля)
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

/* POST /auth/login */
exports.login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  try {
    const user = await userModel.findByEmail(value.email);
    if (!user)
      return res.status(401).json({ message: "Неверные учётные данные" });

    const ok = await userModel.comparePassword(value.password, user.password);
    if (!ok)
      return res.status(401).json({ message: "Неверные учётные данные" });

    // Генерируем JWT — храним id и username
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

/* GET /auth/me  (защищённый) */
exports.me = (req, res) => {
  // passport добавит user в req.user
  res.json(req.user);
};
