import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/stocks/:code (GET)', () => {
    it('When no code is send -> throw error', () => {
      const stockCode = '';
      return request(app.getHttpServer())
        .get(`/stocks/${stockCode}`)
        .expect(404);
    });

    it('When code doesnt exist -> return empty data', () => {
      const stockCode = 'xxxx';
      const responseObj = {
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
      return request(app.getHttpServer())
        .get(`/stocks/${stockCode}`)
        .expect(200)
        .expect(responseObj);
    });

    it('When a code exists -> return data', () => {
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
      return request(app.getHttpServer())
        .get(`/stocks/${stockCode}`)
        .expect(200)
        .expect(expectedPayload);
    });
  });
});
