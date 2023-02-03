import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { STOCK_CODE_REQUIRED } from './constants';

@Injectable()
export class AppService {
  async getStock(code: string): Promise<any> {
    try {
      if (!code) throw new BadRequestException(STOCK_CODE_REQUIRED);
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
          return this.normalizeStockData(fieldsArr, valuesArr);
        }
        return data;
      }

      return {};
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  // Made public for testing purposes
  public normalizeStockData(fields: string[], values: string[]) {
    const payload = {};
    if (!fields?.length || !values?.length) return {};
    fields.forEach((field, index) => {
      payload[fields[index]] = values[index];
    });
    return payload;
  }
}
