import 'module-alias/register'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerBaseConfig,
  SwaggerDocument
} from '@nestjs/swagger'
import { RedocModule } from 'nestjs-redoc'
import { INestApplication } from '@nestjs/common'
import { ConfigService } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  if (configService.isProcessIn.development) {
    // Setup swagger with Redoc UI
    const swaggerDocument = bootstrapSwaggerDocument(app)
    await RedocModule.setup('/docs', app, swaggerDocument, {})
  }

  await app.listen(configService.server.port)
}

/**
 * Creates a swagger documentation. It generates documentation for resrouce endpoints.
 */
function bootstrapSwaggerDocument(app: INestApplication): SwaggerDocument {
  const swaggerBaseConfig: SwaggerBaseConfig = new DocumentBuilder()
    .setTitle('suomi.dev backend API')
    .setVersion('1.0.0')
    .setDescription('API powering https://suomi.dev')
    .setBasePath('/api-docs')
    .build()

  return SwaggerModule.createDocument(app, swaggerBaseConfig)
}

bootstrap()
