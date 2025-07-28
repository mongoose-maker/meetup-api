import express from "express";
const router = express.Router();

import meetupController from "../controllers/meetup.controllers.js";
import isAuth from "../middleware/auth.middleware.js";
import isOrganizer from "../middleware/role.middleware.js";

router.get("/", meetupController.getAllMeetups);
router.get("/:id", meetupController.getMeetupById);

//router.post("/", meetupController.createMeetup);
router.post("/", isAuth, isOrganizer, meetupController.createMeetup);

//router.put("/:id", meetupController.updateMeetup);
router.put("/:id", isAuth, isOrganizer, meetupController.updateMeetup);

//router.delete("/:id", meetupController.deleteMeetup);
router.delete("/:id", isAuth, isOrganizer, meetupController.deleteMeetup);

export default router;
