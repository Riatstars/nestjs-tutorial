import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {
  private users = [
    {
      id: 1,
      email: 'test1@gmail.com',
      name: 'test1',
    },
    {
      id: 2,
      email: 'test2@gmail.com',
      name: 'test2',
    },
    {
      id: 3,
      email: 'test3@gmail.com',
      name: 'test3',
    },
    {
      id: 4,
      email: 'test4@gmail.com',
      name: 'test4',
    },
    {
      id: 5,
      email: 'test5@gmail.com',
      name: 'test5',
    },
  ];
  findCustomerById(id: number) {
    return this.users[id - 1];
  }
  getAllCustomers() {
    return this.users;
  }
  createCustomer(customerDetails: CreateCustomerDto) {
    this.users.push(customerDetails);
  }
}
