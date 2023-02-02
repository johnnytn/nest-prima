import { UserService } from 'src/user/user.service';
export declare class StockService {
    private readonly userService;
    constructor(userService: UserService);
    private logger;
    getStocks(request: any, code: string): Promise<{
        name: string;
        symbol: string;
        open: number;
        high: number;
        low: number;
        close: number;
    }>;
    private mappedStockData;
}
