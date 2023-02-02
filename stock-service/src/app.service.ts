import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getStock(code: string): Promise<any> {
    try {
      const API_PATH = process.env.STOCK_API_URL || 'https://stooq.com/q/l/';
      const { data } = await axios.get(
        `${API_PATH}?s=${code}&f=sd2t2ohlcvn&h&e=csv`,
      );

      if (data) {
        const lineBreak = '\r\n';
        const charSeparator = ',';

        const [fields, values] = data.split(lineBreak);
        const fieldsArr = fields.split(charSeparator);
        const valuesArr = values.split(charSeparator);
        if (fieldsArr.length && valuesArr.length) {
          return this.mappedStockDataAll(fieldsArr, valuesArr);
        }
        return {};
      }
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // TODO: ADD formater
  private mappedStockDataAll(fields: string[], values: string) {
    const payload = {};
    fields.forEach((field, index) => {
      payload[fields[index]] = values[index];
    });
    return payload;
  }
}
