const express = require("express");
const router = express.Router();

const meetupController = require("../controllers/meetup.controllers");
const isAuth = require("../middleware/auth.middleware");
const isOrganizer = require("../middleware/role.middleware");

router.get("/", meetupController.getAllMeetups);
router.get("/:id", meetupController.getMeetupById);

//router.post("/", meetupController.createMeetup);
router.post("/", isAuth, isOrganizer, meetupController.createMeetup);

//router.put("/:id", meetupController.updateMeetup);
router.put("/:id", isAuth, isOrganizer, meetupController.updateMeetup);

//router.delete("/:id", meetupController.deleteMeetup);
router.delete("/:id", isAuth, isOrganizer, meetupController.deleteMeetup);

module.exports = router;
