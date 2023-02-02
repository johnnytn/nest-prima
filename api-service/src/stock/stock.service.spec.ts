import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let mockedUserService: {
    create: jest.Mock;
  };

  beforeEach(async () => {
    mockedUserService = {
      create: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        {
          provide: UserService,
          useValue: mockedUserService,
        },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
