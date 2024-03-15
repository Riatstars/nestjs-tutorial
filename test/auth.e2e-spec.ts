import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as passport from 'passport';
import * as session from 'express-session';

describe('Authentication E2E test', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // app.useGlobalPipes(new ValidationPipe());
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
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe('Authentication', () => {
    const URL = '/api/auth/login';
    let cookie = '';
    it('should login', (done: any) => {
      request(app.getHttpServer())
        .post(URL)
        .send({
          username: 'nam2',
          password: 'Thanhnam6264',
        })
        .expect(201)
        .end((err, res) => {
          cookie = res.headers['set-cookie'];
          done();
        });
    });
    it('should visit /api/users and retunr 200', async () => {
      console.log(cookie);
      return request(app.getHttpServer())
        .get('/api/users')
        .set('Cookie', cookie)
        .expect(200);
    });
  });
});
