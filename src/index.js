import express from "express";
import dotenv from "dotenv";

import SeqUser from "../src/infrastructures/DB/ORM/SeqModel/seq.UserModel.js";
import SeqMeetup from "../src/infrastructures/DB/ORM/SeqModel/seq.MeetupModel.js";
import sequelize from "./infrastructures/DB/db.js";

import { User } from "./core/models/user.model.js";
import { Meetup } from "./core/models/meetup.model.js";

// import meetupRoutes from "./routes/meetup.routes.js";
// import authRoutes from "./routes/auth.routes.js";
import passport from "./infrastructures/config/passport.js";
import errorHandler from "./infrastructures/middleware/errorHandler.js";

// 1. Репозитории (конкретные реализации)
import { SequelizeMeetupRepository } from "./infrastructures/DB/ORM/seqRepositories/SeqMeetupRepo.js";
import { SequelizeUserRepository } from "./infrastructures/DB/ORM/seqRepositories/SeqUserRepo.js";

// 2. Сервисы
import { MeetupService } from "./application/services/meetup.service.js";
import { UserService } from "./application/services/user.service.js";

// 3. Контроллеры
import { MeetupController } from "./infrastructures/controllers/meetup.controllers.js";
import { AuthController } from "./infrastructures/controllers/auth.controller.js";

// 4. Роуты (теперь они должны принимать контроллеры)
import createMeetupRoutes from "./routes/meetup.routes.js";
import createAuthRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

// 1. Создаем экземпляры репозиториев
const meetupRepository = new SequelizeMeetupRepository();
const userRepository = new SequelizeUserRepository();

// 2. Создаем сервисы и ВНЕДРЯЕМ в них репозитории
const meetupService = new MeetupService(meetupRepository);
const userService = new UserService(userRepository);

// 3. Создаем контроллеры и ВНЕДРЯЕМ в них сервисы
const meetupController = new MeetupController(meetupService);
const authController = new AuthController(userService);

SeqUser.hasMany(SeqMeetup, { foreignKey: "owner_id", as: "meetups" });
SeqMeetup.belongsTo(SeqUser, { foreignKey: "owner_id", as: "owner" });

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

// Передаем экземпляры контроллеров в функции, создающие роуты
app.use("/api/meetups", createMeetupRoutes(meetupController));
app.use("/api/auth", createAuthRoutes(authController));
// app.use("/auth", authRoutes);
// app.use("/api/meetups", meetupRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
