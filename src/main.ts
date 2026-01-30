import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { json } from 'express'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'
import helmet from 'helmet'

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule)

  // Security headers
  app.use(helmet())
  if (process.env.DOMAIN_VALID) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
        username: 'default',
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
      },
    })
  }



  await app.startAllMicroservices()
  logger.log('Microservice is listening')

  let listDomain: boolean | string[] = true
  if (process.env.DOMAIN_VALID) {
    listDomain = process.env.DOMAIN_VALID.split(',')
  }


  app.use(json({ limit: '20mb' }))
  app.enableCors({
    origin: listDomain,
  })

  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Edu Manager API')
    .setDescription('The Edu Manager API description for student registration and management')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document)
  await app.listen(process.env.PORT || 3002)
}
bootstrap()
