const Joi = require("joi");

const idSchema = Joi.number().integer().positive().required();

const meetupSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  tags: Joi.array().items(Joi.string()).min(1).required(),
  date: Joi.string().isoDate().required(),
  location: Joi.string().min(3).max(100).required(),
});

const updateMeetupSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(500),
  tags: Joi.array().items(Joi.string()).min(1),
  date: Joi.string().isoDate(),
  location: Joi.string().min(3).max(100),
}).min(1);

module.exports = {
  meetupSchema,
  updateMeetupSchema,
  idSchema,
};
