import express from "express";
import dotenv from "dotenv";
import meetupRoutes from "./routes/meetup.routes.js";
import authRoutes from "./routes/auth.routes.js"; // 💡 Вынес отдельно
import passport from "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 Подключаем middleware
app.use(express.json());
app.use(passport.initialize()); // 🟡 ОБЯЗАТЕЛЬНО вызвать функцию ()

app.use("/api/meetups", meetupRoutes); // основные маршруты
app.use("/auth", authRoutes); // 💡 не забываем слэш перед 'auth'

// Тестовый маршрут
app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
