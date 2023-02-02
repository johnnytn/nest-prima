import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Stock, STOCK_FIELDS } from 'src/commons/types/stock.types';

import { UserService } from 'src/user/user.service';

@Injectable()
export class StockService {
  constructor(private readonly userService: UserService) {}
  private logger = new Logger(StockService.name);
  async getStocks(request, code: string) {
    try {
      const API_PATH = `http://localhost:3002/`;
      const { data } = await axios.get(`${API_PATH}stocks/${code}`);

      if (data) {
        await this.userService.createHistory({
          userId: request.user.userId,
          symbol: data[STOCK_FIELDS.SYMBOL],
          metadata: data,
        });
        this.logger.log(
          `Stock "${data[STOCK_FIELDS.SYMBOL]}" has been added to user "${
            request.user.userId
          }" History`,
        );
      }
      // TODO: add to history table
      return this.mappedStockData(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private mappedStockData(stock: Stock) {
    const payload = {
      name: stock[STOCK_FIELDS.NAME],
      symbol: stock[STOCK_FIELDS.SYMBOL],
      open: stock[STOCK_FIELDS.OPEN] ? Number(stock[STOCK_FIELDS.OPEN]) : 0,
      high: stock[STOCK_FIELDS.HIGH] ? Number(stock[STOCK_FIELDS.HIGH]) : 0,
      low: stock[STOCK_FIELDS.LOW] ? Number(stock[STOCK_FIELDS.LOW]) : 0,
      close: stock[STOCK_FIELDS.CLOSE] ? Number(stock[STOCK_FIELDS.CLOSE]) : 0,
    };
    return payload;
  }
}
