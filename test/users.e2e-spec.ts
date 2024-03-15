import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('userControllers E2E test', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('Creating new User POST /api/users/create', () => {
    const CREATE_USER_URL = '/api/users/create';
    it('should create a new User', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'nam2',
          password: 'Thanhnam6264',
          email: 'nam1@gmail.com',
        })
        .expect(201);
    });

    it('should retunr a 400 when invalid username', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'n',
          password: 'Thanhnam6264',
          email: 'nam1@gmail.com',
        })
        .expect(400);
    });
    it('should retunr a 400 when invalid email', () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: 'nam2',
          password: 'Thanhnam6264',
          email: 'nam1.com',
        })
        .expect(400);
    });
  });
});
