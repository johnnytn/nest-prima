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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const utils_1 = require("../utils/utils");
const user_1 = require("../utils/messages/user");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
        try {
            this.validateNewUserData(createUserDto);
            const { email, role } = createUserDto;
            const generatedPassword = (0, utils_1.generatePassword)();
            const password = await (0, utils_1.hashPassword)(generatedPassword);
            await this.prismaService.user.create({
                data: {
                    email,
                    role,
                    password,
                },
            });
            return {
                email,
                password: generatedPassword,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    findAll() {
        return this.prismaService.user.findMany();
    }
    findOne(id) {
        return this.prismaService.user.findUnique({
            where: { id },
        });
    }
    findByEmail(email) {
        return this.prismaService.user.findUnique({
            where: { email },
        });
    }
    update(id, payload) {
        return this.prismaService.user.update({
            data: payload,
            where: {
                id,
            },
        });
    }
    remove(id) {
        return this.prismaService.user.delete({
            where: {
                id,
            },
        });
    }
    async createHistory(createHistoryDto) {
        try {
            this.validateNewHistoryData(createHistoryDto);
            const { userId, symbol, metadata } = createHistoryDto;
            await this.prismaService.history.create({
                data: {
                    symbol,
                    userId: userId,
                    metadata: metadata,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findHistoriesByUserId(userId) {
        const data = await this.prismaService.history.findMany({
            where: { userId },
            select: {
                metadata: true,
            },
        });
        return data.map((d) => d.metadata);
    }
    async findMostRequestedStocks(limit = 5) {
        const data = await this.prismaService.history.groupBy({
            by: ['symbol'],
            _count: {
                symbol: true,
            },
            orderBy: {
                _count: {
                    symbol: 'desc',
                },
            },
            take: limit,
        });
        return data ? this.mapStats(data) : [];
    }
    validateNewUserData(createUserDto) {
        if (!createUserDto.email)
            throw new Error(user_1.USER_EMAIL_REQUIRED);
        if (!createUserDto.role)
            throw new Error(user_1.USER_ROLE_REQUIRED);
        if (!Object.values(user_entity_1.RoleType).includes(createUserDto.role))
            throw new Error(user_1.USER_ROLE_NOT_ALLOWED);
        return true;
    }
    validateNewHistoryData(data) {
        if (!data.userId)
            throw new Error(user_1.HISTORY_USER_ID_REQUIRED);
        if (!data.symbol)
            throw new Error(user_1.HISTORY_SYMBOL_REQUIRED);
        if (!data.metadata)
            throw new Error(user_1.HISTORY_METADATA_REQUIRED);
        return true;
    }
    mapStats(data) {
        return data.map((d) => {
            return {
                stock: d.symbol,
                times_requested: d._count.symbol,
            };
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map