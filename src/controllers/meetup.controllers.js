import * as svc from "../services/meetup.service.js";
import {
  meetupSchema,
  updateMeetupSchema,
} from "../validators/meetup.validators.js";

export const getAllMeetups = async (req, res, next) => {
  try {
    const { tags, sort, page, limit } = req.query;
    const tagList = tags
      ? tags
          .toLowerCase()
          .split(",")
          .map((t) => t.trim())
      : undefined;

    const { rows, count } = await svc.getAll({
      tags: tagList,
      sort,
      page,
      limit,
    });
    res.json({
      total: count,
      page: +page || 1,
      limit: +limit || 10,
      data: rows,
    });
  } catch (e) {
    next(e);
  }
};

export const getMeetup = async (req, res, next) => {
  try {
    const row = await svc.getById(req.params.id);
    return row ? res.json(row) : res.status(404).json({ message: "Not found" });
  } catch (e) {
    next(e);
  }
};

export const createMeetup = async (req, res, next) => {
  try {
    await meetupSchema.validateAsync(req.body);
    const row = await svc.create({ ...req.body, ownerId: req.user?.id });
    res.status(201).json(row);
  } catch (e) {
    next(e);
  }
};

export const updateMeetup = async (req, res, next) => {
  try {
    await updateMeetupSchema.validateAsync(req.body);
    const row = await svc.update(req.params.id, req.body);
    return row ? res.json(row) : res.status(404).json({ message: "Not found" });
  } catch (e) {
    next(e);
  }
};

export const deleteMeetup = async (req, res, next) => {
  try {
    const ok = await svc.remove(req.params.id);
    res.status(ok ? 204 : 404).end();
  } catch (e) {
    next(e);
  }
};
