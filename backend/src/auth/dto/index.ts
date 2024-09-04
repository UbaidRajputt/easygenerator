import { CONSTANTS } from "src/constants";
import { UserRoles } from "src/mongoose/schemas/user.schema";
import { z } from "zod";

const RoleSchema = z.enum([
  UserRoles.SUPER_ADMIN,
  UserRoles.ADMIN,
  UserRoles.USER,
]);

export const SignupSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(8)
    .max(255)
    .regex(
      CONSTANTS.PASSWORD_REGEX,
      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
    ),
  fullName: z.string().min(3).max(255),
});

export const SigninSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(6).max(44),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email().toLowerCase(),
  fullName: z.string().nullable(),
  role: RoleSchema,
});

export const UserTokenSchema = z.object({
  id: z.string(),
  email: z.string().email().toLowerCase(),
  role: RoleSchema,
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export type SignupDto = z.infer<typeof SignupSchema>;

export type SigninDto = z.infer<typeof SigninSchema>;

export type UserDto = z.infer<typeof UserSchema>;

export type RefreshTokenDto = z.infer<typeof RefreshTokenSchema>;

export type UserTokenDto = z.infer<typeof UserTokenSchema>;
