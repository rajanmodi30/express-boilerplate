import { object, string, z } from "zod";

export const ResetPasswordRequest = object({
  password: string(),
  confirm_password: string(),
}).superRefine(({ password, confirm_password }, ctx) => {
  if (password !== confirm_password) {
    ctx.addIssue({
      code: "custom",
      message: "confirm password and password must be same",
    });
  }
});

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequest>;
