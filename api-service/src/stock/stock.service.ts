import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  async getStocks(code: string) {
    try {
      const API_PATH = `http://localhost:3002/`;
      const { data } = await axios.get(`${API_PATH}stocks/${code}`);
      // TODO: add to history table
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}