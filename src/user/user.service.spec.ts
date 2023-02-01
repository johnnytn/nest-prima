import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let mockedPrismaService: any; // PrismaService
  // let prisma = module.get<PrismaService>(PrismaService)

  /* prisma.name.findMany = jest.fn().mockReturnValueOnce([
    { id: 0, name: 'developer' },
    { id: 10, name: 'architect' },
    { id: 13, name: 'dog walker' }
]); */

  beforeEach(async () => {
    mockedPrismaService = jest.fn();
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
});
