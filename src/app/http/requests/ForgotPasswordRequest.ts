import joi, { ObjectSchema } from "joi";

export const ForgotPasswordRequest: ObjectSchema = joi.object({
  email: joi.string().required().email(),
});
