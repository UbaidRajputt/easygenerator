import { createZodDto } from "@anatine/zod-nestjs";
import { RefreshTokenSchema, SigninSchema, SignupSchema } from "../dto";
import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

export class SignupSwaggerSchema extends createZodDto(SignupSchema) {}

export class SigninSwaggerSchema extends createZodDto(SigninSchema) {}

export class RefreshTokenSwaggerSchema extends createZodDto(
  RefreshTokenSchema
) {}

export function ApiSignupDoc() {
  return applyDecorators(
    ApiOperation({ summary: "Sign up a new user", operationId: "signup" }),
    ApiBody({
      type: SignupSwaggerSchema,
    }),
    ApiResponse({ status: 201, description: "User successfully created" }),
    ApiResponse({ status: 400, description: "Bad Request" })
  );
}

export function ApiSigninDoc() {
  return applyDecorators(
    ApiOperation({ summary: "Log in a user", operationId: "login" }),
    ApiBody({
      type: SigninSwaggerSchema,
    }),
    ApiResponse({ status: 200, description: "User successfully logged in" }),
    ApiResponse({ status: 401, description: "Unauthorized" })
  );
}

export function ApiRefreshTokenDoc() {
  return applyDecorators(
    ApiOperation({
      summary: "Refresh a user's token",
      operationId: "refreshToken",
    }),
    ApiBody({
      type: RefreshTokenSwaggerSchema,
    }),
    ApiResponse({ status: 200, description: "Token successfully refreshed" }),
    ApiResponse({ status: 401, description: "Unauthorized" })
  );
}

export function ApiFindMeDoc() {
  return applyDecorators(
    ApiOperation({ summary: "Get the current user", operationId: "findMe" }),
    ApiResponse({ status: 200, description: "User successfully retrieved" }),
    ApiResponse({ status: 401, description: "Unauthorized" }),
    ApiBearerAuth()
  );
}
