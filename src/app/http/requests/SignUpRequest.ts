import { Devices } from "@prisma/client";
import { nativeEnum, object, string, infer, z } from "zod";

export const SignUpRequest = object({
  firstName: string(),
  lastName: string(),
  email: string().email(),
  password: string(),
  confirm_password: string(),
  deviceType: nativeEnum(Devices),
  metaData: object({}).optional(),
  fcmToken: string(),
}).superRefine(({ password, confirm_password }, ctx) => {
  if (password !== confirm_password) {
    ctx.addIssue({
      code: "custom",
      message: "confirm password and password must be same",
    });
  }
});

export type SignUpRequest = z.infer<typeof SignUpRequest>;
