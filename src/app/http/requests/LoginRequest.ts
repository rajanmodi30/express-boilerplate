import { Devices } from "@prisma/client";
import joi, { ObjectSchema } from "joi";

export const LoginRequest: ObjectSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
  deviceType: joi
    .string()
    .valid(...Object.values(Devices))
    .required(),
  metaData: joi.object(),
  fcmToken: joi.string(),
});
