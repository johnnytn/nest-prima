import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getStock(code: string): Promise<any> {
    try {
      const API_PATH = 'https://stooq.com/q/l/';
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
          return this.mappedStockData(fieldsArr, valuesArr);
        }
        return {};
      }
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private mappedStockData(fields: string[], values: string[]) {
    const nameIndex = fields.findIndex((f) => f === 'Name');
    const symbolIndex = fields.findIndex((f) => f === 'Symbol');
    const openIndex = fields.findIndex((f) => f === 'Open');
    const highIndex = fields.findIndex((f) => f === 'High');
    const lowIndex = fields.findIndex((f) => f === 'Low');
    const closeIndex = fields.findIndex((f) => f === 'Close');
    const payload = {
      name: values[nameIndex],
      symbol: values[symbolIndex],
      open: values[openIndex] ? Number(values[openIndex]) : 0,
      high: values[highIndex] ? Number(values[highIndex]) : 0,
      low: values[lowIndex] ? Number(values[lowIndex]) : 0,
      close: values[closeIndex] ? Number(values[closeIndex]) : 0,
    };
    return payload;
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
