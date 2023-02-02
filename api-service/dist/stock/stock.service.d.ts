import { UserService } from 'src/user/user.service';
export declare class StockService {
    private readonly userService;
    constructor(userService: UserService);
    getStocks(request: any, code: string): Promise<any>;
}
