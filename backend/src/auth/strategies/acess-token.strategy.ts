import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../jwt-constants";
import { UserTokenDto } from "../dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/mongoose/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class AcessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: UserTokenDto) {
    // Note: we can save users in redis cache to avoid extra db call, but for this task we wont be using redis
    const user = await this.UserModel.findOne({
      _id: payload.id,
    });

    if (!user || user.disabled) {
      return null;
    }

    user.passwordHash = "";
    user.refreshToken = "";

    return user;
  }
}
