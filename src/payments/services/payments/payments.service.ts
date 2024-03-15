import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from '../../dto/CreatePayment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'nam1@gmail.com',
    },
    {
      email: 'nam2@gmail.com',
    },
    {
      email: 'nam3@gmail.com',
    },
  ];

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const email = createPaymentDto.email;

    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new BadRequestException();
    }
    return {
      id: 1,
      status: 'success',
    };
  }
}
