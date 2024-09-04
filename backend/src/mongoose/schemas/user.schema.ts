import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

export type UserDocument = HydratedDocument<User>;

export enum UserRoles {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  passwordHash: string;

  @Prop({
    required: true,
    trim: true,
  })
  fullName: string;

  @Prop()
  refreshToken: string;

  @Prop({
    type: String,
    enum: [UserRoles.SUPER_ADMIN, UserRoles.ADMIN, UserRoles.USER],
    default: UserRoles.USER,
  })
  role: string;

  @Prop({
    default: false,
  })
  disabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);
