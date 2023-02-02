import { StockService } from './stock.service';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    getStocks(req: any, code: string): Promise<{
        name: string;
        symbol: string;
        open: number;
        high: number;
        low: number;
        close: number;
    }>;
}
