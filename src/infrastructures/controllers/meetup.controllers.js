import { meetupSchema } from "../validators/meetup.validators.js";
import { updateMeetupSchema } from "../validators/meetup.validators.js";
export class MeetupController {
  constructor(meetupService) {
    this.meetupService = meetupService;
  }
  getAllMeetups = async (req, res, next) => {
    try {
      const options = req.query;
      const result = await this.meetupService.getAllMeetups(options);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
  getMeetup = async (req, res, next) => {
    try {
      const row = await this.meetupService.getMeetupById(req.params.id); //* getById
      if (row) {
        return res.json(row);
      }
      res.status(404).json({ message: "Not found" });
    } catch (err) {
      next(err);
    }
  };
  createMeetup = async (req, res, next) => {
    try {
      await meetupSchema.validateAsync(req.body);
      const row = await this.meetupService.createMeetup({
        ...req.body,
        owner_id: req.user?.id,
      });
      res.status(201).json(row);
    } catch (err) {
      next(err);
    }
  };
  updateMeetup = async (req, res, next) => {
    try {
      await updateMeetupSchema.validateAsync(req.body);
      const row = await this.meetupService.updateMeetup(
        req.params.id,
        req.body
      );
      if (row) {
        return res.json(row);
      }
      res.status(404).json({ message: "Not found" });
    } catch (err) {
      next(err);
    }
  };
  deleteMeetup = async (req, res, next) => {
    try {
      const ok = await this.meetupService.deleteMeetup(req.params.id);
      res.status(ok ? 204 : 404).end();
    } catch (err) {
      next(err);
    }
  };
}
