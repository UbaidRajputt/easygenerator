import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from "nest-winston";
import * as winston from "winston";
import configuration from "./config/configuration";
import { HttpLoggerMiddleware } from "./http.logger.middleware";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import mongoose from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        mongoose.plugin(mongoosePaginate);
        return {
          uri: process.env.DATABASE_URL,
        };
      },
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(
              "Easy Generator Backend Service",
              {
                colors: true,
                prettyPrint: true,
              }
            )
          ),
        }),
      ],
    }),
    HealthModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
