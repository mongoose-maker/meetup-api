// const express = require("express");
// const dotenv = require("dotenv");
// const meetupRoutes = require("./routes/meetup.routes");
// const passport = require("./config/passport");

// dotenv.config();

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use("/api/meetups", meetupRoutes);
// app.use(passport.initialize);
// app.use("auth", require("./routes/auth.routes"));

// app.get("/", (req, res) => {
//   res.send(" API Works!");
// });

// app.listen(PORT, () => {
//   console.log(`The server is running on http://localhost:${PORT}`);
// });

const express = require("express");
const dotenv = require("dotenv");
const meetupRoutes = require("./routes/meetup.routes");
const authRoutes = require("./routes/auth.routes"); // 💡 Вынес отдельно
const passport = require("./config/passport");

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
