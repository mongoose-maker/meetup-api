import Joi from "joi";

export const idSchema = Joi.number().integer().positive().required();

export const meetupSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
  date: Joi.string().isoDate().required(),
  location: Joi.string().min(3).max(100).required(),
});

export const updateMeetupSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(500),
  tags: Joi.array().items(Joi.string()).min(1),
  date: Joi.string().isoDate(),
  location: Joi.string().min(3).max(100),
}).min(1);

export default {
  meetupSchema,
  updateMeetupSchema,
  idSchema,
};
