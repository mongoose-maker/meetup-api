import express from "express";
import dotenv from "dotenv";

import sequelize from "./config/db.js";
import User from "./models/user.model.js";
import Meetup from "./models/meetup.model.js";

import meetupRoutes from "./routes/meetup.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "./config/passport.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

User.hasMany(Meetup, { foreignKey: "ownerId", as: "meetups" });
Meetup.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

try {
  await sequelize.authenticate();
  if (process.env.DB_SYNC === "true") {
    await sequelize.sync();
  }
  console.log("Соеденение с БД установлено");
} catch (err) {
  console.log("Соеденение с БД не установлено: ", err);
  process.exit(1);
}

app.use("/auth", authRoutes);
app.use("/api/meetups", meetupRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
