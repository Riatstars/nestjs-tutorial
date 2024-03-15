import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const sessionRepository = getRepository(SessionEntity)
  app.setGlobalPrefix('api');
  app.use(
    session({
      name: 'NestJS_Session_ID',
      secret: 'asdjhaldnbvluarevjdnfvq43jnva.kjnfvq34',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      // store: new TypeOrmStore().connect(sessionRepository)
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
