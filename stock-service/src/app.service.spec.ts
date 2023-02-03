import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getStock', () => {
    it('when code exists -> return data', async () => {
      const stockCode = 'aapl.us';
      const expectedPayload = {
        Close: '150.82',
        Date: '2023-02-02',
        High: '151.18',
        Low: '148.17',
        Name: 'APPLE',
        Open: '148.9',
        Symbol: 'AAPL.US',
        Time: '22:00:07',
        Volume: '118338980',
      };
      const response = await service.getStock(stockCode);
      expect(response).toStrictEqual(expectedPayload);
    });

    it('when code doesnt exists -> return data', async () => {
      const stockCode = 'XXXX';
      const expectedPayload = {
        Symbol: 'XXXX',
        Date: 'N/D',
        Time: 'N/D',
        Open: 'N/D',
        High: 'N/D',
        Low: 'N/D',
        Close: 'N/D',
        Volume: 'N/D',
        Name: 'XXXX',
      };
      const response = await service.getStock(stockCode);
      expect(response).toStrictEqual(expectedPayload);
    });
  });

  describe('normalizeStockData', () => {
    it('when "fields" data is not passed -> return empty obj', async () => {
      const rawFields = [];
      const rawValues = [
        'AIO.US',
        '2023-02-02',
        '22:00:16',
        '17.9',
        '18',
        '17.71',
        '17.98',
        '222233',
        'VIRTUS ARTIFICIAL INTELLIGENCE',
      ];
      const expectedOutput = {};

      const response = service.normalizeStockData(rawFields, rawValues);
      expect(response).toStrictEqual(expectedOutput);
    });

    it('when "values" data is not passed -> return empty obj', async () => {
      const rawFields = [
        'Symbol',
        'Date',
        'Time',
        'Open',
        'High',
        'Low',
        'Close',
        'Volume',
        'Name',
      ];
      const rawValues = [];
      const expectedOutput = {};

      const response = service.normalizeStockData(rawFields, rawValues);
      expect(response).toStrictEqual(expectedOutput);
    });

    it('when right data is passed -> return normalized data', async () => {
      const rawFields = [
        'Symbol',
        'Date',
        'Time',
        'Open',
        'High',
        'Low',
        'Close',
        'Volume',
        'Name',
      ];
      const rawValues = [
        'AIO.US',
        '2023-02-02',
        '22:00:16',
        '17.9',
        '18',
        '17.71',
        '17.98',
        '222233',
        'VIRTUS ARTIFICIAL INTELLIGENCE',
      ];
      const expectedOutput = {
        Symbol: 'AIO.US',
        Date: '2023-02-02',
        Time: '22:00:16',
        Open: '17.9',
        High: '18',
        Low: '17.71',
        Close: '17.98',
        Volume: '222233',
        Name: 'VIRTUS ARTIFICIAL INTELLIGENCE',
      };

      const response = service.normalizeStockData(rawFields, rawValues);
      expect(response).toStrictEqual(expectedOutput);
    });
  });
});
