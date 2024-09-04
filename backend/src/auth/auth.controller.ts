import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from "../zode.validation.pipe";
import {
  RefreshTokenDto,
  RefreshTokenSchema,
  SigninDto,
  SigninSchema,
  SignupDto,
  SignupSchema,
} from "./dto";
import { Request } from "express";
import { Roles } from "src/decorators/roles.decorator";
import { UserRoles } from "src/mongoose/schemas/user.schema";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { RolesGuard } from "./guards/roles.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from "@nestjs/swagger";
import {
  ApiFindMeDoc,
  ApiRefreshTokenDoc,
  ApiSigninDoc,
  ApiSignupDoc,
} from "./docs";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @UsePipes(new ZodValidationPipe(SignupSchema))
  @ApiSignupDoc()
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post("login")
  @UsePipes(new ZodValidationPipe(SigninSchema))
  @HttpCode(HttpStatus.OK)
  @ApiSigninDoc()
  login(@Body() body: SigninDto) {
    return this.authService.login(body);
  }

  @Post("refreshToken")
  @UsePipes(new ZodValidationPipe(RefreshTokenSchema))
  @HttpCode(HttpStatus.OK)
  @ApiRefreshTokenDoc()
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.USER)
  @ApiFindMeDoc()
  findme(@Req() req: Request) {
    return this.authService.findMe(req.user);
  }
}
