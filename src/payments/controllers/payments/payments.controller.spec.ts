import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
import { BadRequestException } from '@nestjs/common';
import { PaymentsService } from '../../services/payments/payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: PaymentsService;

  let requestMock = {
    query: {},
  } as unknown as Request;

  let statusResponseMock = {
    send: jest.fn((x) => x),
  };

  let responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: 'PAYMENTS_SERVICE',
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentsService = module.get<PaymentsService>('PAYMENTS_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('paymentService should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing query parameters',
      });
    });
    it('should return status of 200 when query params are present', () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe('createPayment', () => {
    // it('should return a successful response', async () => {
    //   const response = await controller.createPayment({
    //     email: 'nam1@gmail.com',
    //     price: 100,
    //   });
    //   expect(response).toStrictEqual({ status: 'success' });
    // });

    it('should throw an error', async () => {
      jest
        .spyOn(paymentsService, 'createPayment')
        .mockImplementationOnce(() => {
          throw new BadRequestException();
        });
      try {
        const response = await controller.createPayment({
          email: 'nam1@gmail.com',
          price: 100,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
