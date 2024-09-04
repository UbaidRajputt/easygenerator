import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RefreshTokenDto, SigninDto, SignupDto, UserDto } from "./dto";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./jwt-constants";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/mongoose/schemas/user.schema";
import { Document, FilterQuery, Model, Types } from "mongoose";

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService
  ) {}
  async signup(payload: SignupDto) {
    try {
      await this.findUserByEmail(payload.email, "create");

      const hashedPassword = await argon2.hash(payload.password);

      const user = await this.createUser({
        email: payload.email,
        passwordHash: hashedPassword,
        fullName: payload.fullName,
      });

      const tokens = this.generateJwtTokens(user);

      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return {
        ...tokens,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async login(payload: SigninDto) {
    try {
      const user = await this.findUserByEmail(payload.email, "find");

      if (user.disabled) {
        throw new HttpException(
          "user account is disabled",
          HttpStatus.FORBIDDEN
        );
      }

      const passwordMatch = await argon2.verify(
        user.passwordHash,
        payload.password
      );

      if (!passwordMatch) {
        throw new HttpException("invalid password", HttpStatus.FORBIDDEN);
      }

      const tokens = this.generateJwtTokens(user);

      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return {
        ...tokens,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async refreshToken(payload: RefreshTokenDto) {
    try {
      const user = this.jwtService.verify(payload.refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

      if (!user) {
        throw new HttpException("invalid refresh token", HttpStatus.FORBIDDEN);
      }

      const validRefreshToken = await this.findOne({
        _id: user.id,
        refreshToken: payload.refreshToken,
      });

      if (!validRefreshToken) {
        throw new HttpException("invalid refresh token", HttpStatus.FORBIDDEN);
      }

      const tokens = this.generateJwtTokens(user);

      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (error.message === "jwt malformed") {
        throw new HttpException("invalid refresh token", HttpStatus.FORBIDDEN);
      }
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    return await this.UserModel.updateOne(
      {
        _id: userId,
      },
      {
        refreshToken,
      }
    );
  }

  private generateJwtTokens(
    payload: Document<unknown, {}, User> &
      User & {
        _id: Types.ObjectId;
      }
  ) {
    const { id, email, role } = payload;
    const access_token = this.jwtService.sign(
      {
        id,
        email,
        role,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expiresIn,
      }
    );

    const refresh_token = this.jwtService.sign(
      {
        id,
        email,
        role,
      },
      {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshTokenExpiresIn,
      }
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async findUserByEmail(email: string, action: "create" | "find") {
    const user = await this.UserModel.findOne({ email });

    if (action === "create" && user) {
      throw new HttpException("user already exists", HttpStatus.BAD_REQUEST);
    }

    if (action === "find" && !user) {
      throw new HttpException("user not found", HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findUserById(id: string) {
    const user = await this.UserModel.findById(id);

    if (!user) {
      throw new HttpException("user not found", HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findMe(payload: UserDto) {
    try {
      const user = await this.UserModel.findById(payload.id);

      if (!user) {
        throw new HttpException("user not found", HttpStatus.FORBIDDEN);
      }

      return {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne<T>(payload: T) {
    return await this.UserModel.findOne(payload as FilterQuery<User>);
  }

  async createUser<T>(payload: T) {
    return await this.UserModel.create(payload);
  }
}
