import joi, { ObjectSchema } from "joi";

export const ResetPasswordRequest: ObjectSchema = joi.object({
  password: joi.string().required(),
  confirm_password: joi
    .string()
    .required()
    .valid(joi.ref("password"), "confirm password and password must be same"),
});
