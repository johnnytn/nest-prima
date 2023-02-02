import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { StockService } from 'src/stock/stock.service';
import {
  USER_EMAIL_REQUIRED,
  USER_ROLE_NOT_ALLOWED,
  USER_ROLE_REQUIRED,
} from 'src/utils/messages/user';
import { RoleType } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockedPrismaService: {
    user: {
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    mockedPrismaService = {
      user: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockedPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create user', () => {
    it('When no role -> should throw error', async () => {
      const mockedData = {
        email: 'test@mail.com',
        role: null,
      };
      await expect(service.create(mockedData)).rejects.toThrowError(
        USER_ROLE_REQUIRED,
      );
    });

    it('When no role -> should throw error', async () => {
      const mockedData: any = {
        email: 'test@mail.com',
        role: 'random role',
      };
      await expect(service.create(mockedData)).rejects.toThrowError(
        USER_ROLE_NOT_ALLOWED,
      );
    });

    it('When no email -> should throw error', async () => {
      const mockedData = {
        email: null,
        role: RoleType.USER,
      };

      await expect(service.create(mockedData)).rejects.toThrowError(
        USER_EMAIL_REQUIRED,
      );
    });

    it('When everything is fine -> should pass', async () => {
      const mockedData = {
        email: 'test@tes.com',
        role: RoleType.USER,
      };
      const mockedReturn = {
        id: '12',
        email: 'test@tes.com',
        role: RoleType.USER,
      };
      mockedPrismaService.user.create(mockedReturn);

      const response = await service.create(mockedData);
      expect(response.email).toBe(mockedData.email);
    });
  });
});
