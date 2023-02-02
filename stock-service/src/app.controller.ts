import { Controller, Get, Param, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/stocks/:code')
  async getStocks(@Param('code') code: string): Promise<any> {
    return await this.appService.getStock(code);
  }
}
