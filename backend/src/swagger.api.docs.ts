import { patchNestjsSwagger } from "@anatine/zod-nestjs";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("Easy Generator Backend Service")
    .setDescription("API for Easy Generator Backend Service")
    .setVersion("1.0")
    .addServer("http://localhost:3030/", "Local environment")
    .addServer("https://staging.yourapi.com/", "Staging")
    .addServer("https://production.yourapi.com/", "Production")
    .addBearerAuth()
    .build();

  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
};
