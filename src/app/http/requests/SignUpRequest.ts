import { Devices } from "@prisma/client";
import joi, { ObjectSchema } from "joi";

export const SignUpRequest: ObjectSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  confirm_password: joi
    .string()
    .required()
    .valid(joi.ref("password"), "confirm password and password must be same"),
  deviceType: joi
    .string()
    .valid(...Object.values(Devices))
    .required(),
  metaData: joi.object(),
  fcmToken: joi.string(),
});
