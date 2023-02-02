import { Controller, Get, Post, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import axios from 'axios';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}
  // 3002
  @Get()
  async getStocks(@Query('q') code: string) {
    return this.stockService.getStocks(code);
    // return
    // axios
  }
}
