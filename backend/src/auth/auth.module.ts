import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AcessTokenStrategy } from "./strategies/acess-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/mongoose/schemas/user.schema";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AcessTokenStrategy, RefreshTokenStrategy],
  exports: [],
})
export class AuthModule {}
