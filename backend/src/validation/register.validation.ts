import { Joi } from "express-validation";

export const RegisterValidation = Joi.object().keys({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordConfirm: Joi.string().min(6).required(),
});
