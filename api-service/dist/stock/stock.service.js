"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const stock_types_1 = require("../commons/types/stock.types");
const user_service_1 = require("../user/user.service");
let StockService = StockService_1 = class StockService {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(StockService_1.name);
    }
    async getStocks(request, code) {
        try {
            const API_PATH = `http://localhost:3002/`;
            const { data } = await axios_1.default.get(`${API_PATH}stocks/${code}`);
            if (data) {
                const metadata = this.mapStockToDB(data);
                await this.userService.createHistory({
                    userId: request.user.userId,
                    symbol: data[stock_types_1.STOCK_FIELDS.SYMBOL],
                    metadata,
                });
                this.logger.log(`Stock "${data[stock_types_1.STOCK_FIELDS.SYMBOL]}" has been added to user "${request.user.userId}" History`);
            }
            return this.mapStockToResponse(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    mapStockToResponse(stock) {
        const payload = {
            name: stock[stock_types_1.STOCK_FIELDS.NAME],
            symbol: stock[stock_types_1.STOCK_FIELDS.SYMBOL],
            open: stock[stock_types_1.STOCK_FIELDS.OPEN] ? Number(stock[stock_types_1.STOCK_FIELDS.OPEN]) : 0,
            high: stock[stock_types_1.STOCK_FIELDS.HIGH] ? Number(stock[stock_types_1.STOCK_FIELDS.HIGH]) : 0,
            low: stock[stock_types_1.STOCK_FIELDS.LOW] ? Number(stock[stock_types_1.STOCK_FIELDS.LOW]) : 0,
            close: stock[stock_types_1.STOCK_FIELDS.CLOSE] ? Number(stock[stock_types_1.STOCK_FIELDS.CLOSE]) : 0,
        };
        return payload;
    }
    mapStockToDB(stock) {
        const payload = {
            date: stock[stock_types_1.STOCK_FIELDS.DATE]
                ? new Date(stock[stock_types_1.STOCK_FIELDS.DATE]).toJSON()
                : '',
            name: stock[stock_types_1.STOCK_FIELDS.NAME],
            symbol: stock[stock_types_1.STOCK_FIELDS.SYMBOL],
            open: stock[stock_types_1.STOCK_FIELDS.OPEN],
            high: stock[stock_types_1.STOCK_FIELDS.HIGH] ? Number(stock[stock_types_1.STOCK_FIELDS.HIGH]) : 0,
            low: stock[stock_types_1.STOCK_FIELDS.LOW] ? Number(stock[stock_types_1.STOCK_FIELDS.LOW]) : 0,
            close: stock[stock_types_1.STOCK_FIELDS.CLOSE],
        };
        return payload;
    }
};
StockService = StockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map