import { CONSTANTS } from "@/common/constants";
import { z } from "zod";

export const SigninFormSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8).max(255).regex(CONSTANTS.PASSWORD_REGEX, {
    message:
      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
  }),
});

export type SigninFormData = z.infer<typeof SigninFormSchema>;
