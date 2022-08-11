import { Devices, SocialTypes } from "@prisma/client";
import joi, { ObjectSchema } from "joi";

export const SocialLoginRequest: ObjectSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  socialId: joi.string().required(),
  socialType: joi
    .string()
    .required()
    .valid(...Object.values(SocialTypes)),
  socialToken: joi.string().required(),
  deviceType: joi
    .string()
    .valid(...Object.values(Devices))
    .required(),
  metaData: joi.object(),
  fcmToken: joi.string(),
});
