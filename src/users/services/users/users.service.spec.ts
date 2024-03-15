import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../typeorm/User';
import { Repository } from 'typeorm';
import * as bcryptUtils from '../../../utils/bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((x) => x),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('UserRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    jest.spyOn(bcryptUtils, 'encodePassword').mockReturnValue('hashed123');
    it('should encode password correctly', async () => {
      await service.createUser({
        username: 'nam',
        email: 'nam1@gmail.com',
        password: 'Thanhnam6264',
      });
      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('Thanhnam6264');
    });

    it('should call userRepository.create with correct params', async () => {
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        username: 'nam',
        email: 'nam1@gmail.com',
        password: 'hashed123',
      });
      await service.createUser({
        username: 'nam',
        email: 'nam1@gmail.com',
        password: 'Thanhnam6264',
      });
      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'nam',
        email: 'nam1@gmail.com',
        password: 'hashed123',
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        username: 'nam',
        email: 'nam1@gmail.com',
        password: 'hashed123',
      });
    });
  });
});
