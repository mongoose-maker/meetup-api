import express from "express";
import dotenv from "dotenv";
import sequelize from "sequelize";
import meetupRoutes from "./routes/meetup.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "./config/passport.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/api/meetups", meetupRoutes);
app.use(errorHandler);

app.use("/api/meetups", meetupRoutes);
app.use("/auth", authRoutes);

try {
  await sequelize;
  console.log("Соеденение с БД установлено");
} catch (err) {
  console.log("Соеденение с БД не установлено: ", err);
}

app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
