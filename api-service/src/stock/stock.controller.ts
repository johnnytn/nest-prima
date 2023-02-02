import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { StockService } from './stock.service';

@UseGuards(JwtAuthGuard)
@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async getStocks(@Request() req, @Query('q') code: string) {
    return this.stockService.getStocks(req, code);
  }
}
