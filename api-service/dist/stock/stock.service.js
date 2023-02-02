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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const user_service_1 = require("../user/user.service");
let StockService = class StockService {
    constructor(userService) {
        this.userService = userService;
    }
    async getStocks(request, code) {
        try {
            const API_PATH = `http://localhost:3002/`;
            const { data } = await axios_1.default.get(`${API_PATH}stocks/${code}`);
            if (data) {
                console.log('---------------------------request.user');
                console.log(request.user);
                console.log('---------------------------request.user');
                this.userService.createHistory({
                    userId: request.user.userId,
                    symbol: data['symbol'],
                    metadata: data,
                });
            }
            return data;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
StockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], StockService);
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map