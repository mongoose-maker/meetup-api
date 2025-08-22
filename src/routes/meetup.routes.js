import { Router } from "express";

export default function createMeetupRoutes(meetupController) {
  const router = Router();
  router.get("/", meetupController.getAllMeetups);
  router.get("/:id", meetupController.getMeetup);
  router.post("/", meetupController.createMeetup);
  router.put("/:id", meetupController.updateMeetup);
  router.delete("/:id", meetupController.deleteMeetup);
  return router;
}
