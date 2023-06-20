import * as Joi from "joi";

export const book = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publishedDate: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const user = Joi.object({
  nameUser: Joi.string().required(),
  password: Joi.string().required(),
});

export const comment = Joi.object({
  content: Joi.string().required(),
  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required(),
  idUser: Joi.string().required(),
  idBook: Joi.string().required(),
});
