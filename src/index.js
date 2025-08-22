import express from "express";
import dotenv from "dotenv";

import SeqUser from "../src/infrastructures/DB/ORM/SeqModel/seq.UserModel.js";
import SeqMeetup from "../src/infrastructures/DB/ORM/SeqModel/seq.MeetupModel.js";
import sequelize from "./infrastructures/DB/db.js";

import passport from "./infrastructures/config/passport.js";
import errorHandler from "./infrastructures/middleware/errorHandler.js";

import { SequelizeMeetupRepository } from "./infrastructures/DB/ORM/seqRepositories/SeqMeetupRepo.js";
import { SequelizeUserRepository } from "./infrastructures/DB/ORM/seqRepositories/SeqUserRepo.js";

import { MeetupService } from "./application/services/meetup.service.js";
import { UserService } from "./application/services/user.service.js";

import { MeetupController } from "./infrastructures/controllers/meetup.controllers.js";
import { AuthController } from "./infrastructures/controllers/auth.controller.js";

import createMeetupRoutes from "./routes/meetup.routes.js";
import createAuthRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

const meetupRepository = new SequelizeMeetupRepository();
const userRepository = new SequelizeUserRepository();

const meetupService = new MeetupService(meetupRepository);
const userService = new UserService(userRepository);

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

app.use("/api/meetups", createMeetupRoutes(meetupController));
app.use("/api/auth", createAuthRoutes(authController));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
