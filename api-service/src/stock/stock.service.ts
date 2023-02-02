import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserService } from 'src/user/user.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(private readonly userService: UserService) {}
  async getStocks(request, code: string) {
    try {
      const API_PATH = `http://localhost:3002/`;
      const { data } = await axios.get(`${API_PATH}stocks/${code}`);
      if (data) {
        // createHistory
        console.log('---------------------------request.user');
        console.log(request.user);
        console.log('---------------------------request.user');
        this.userService.createHistory({
          userId: request.user.userId,
          symbol: data['symbol'],
          metadata: data,
        });
      }
      // TODO: add to history table
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
