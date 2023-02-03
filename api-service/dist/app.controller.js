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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const roles_decorator_1 = require("./auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./auth/guards/roles.guard");
const create_user_dto_1 = require("./user/dto/create-user.dto");
const user_entity_1 = require("./user/entities/user.entity");
const user_controller_1 = require("./user/user.controller");
let AppController = class AppController {
    constructor(appService, userController, authController) {
        this.appService = appService;
        this.userController = userController;
        this.authController = authController;
    }
    getHello() {
        return this.appService.getHello();
    }
    registerUser(createUserDto) {
        return this.userController.create(createUserDto);
    }
    getHistories(req) {
        return this.userController.getHistories(req);
    }
    getStats() {
        console.log('fetch stats');
        return this.userController.getStats();
    }
    async resetPassword(email) {
        return this.authController.resetPassword(email);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, jwt_auth_guard_1.Public)(),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Get)('/history'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHistories", null);
__decorate([
    (0, roles_decorator_1.Roles)(user_entity_1.RoleType.ADMIN),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getStats", null);
__decorate([
    (0, jwt_auth_guard_1.Public)(),
    (0, common_1.Post)('reset-passowrd'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "resetPassword", null);
AppController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        user_controller_1.UserController,
        auth_controller_1.AuthController])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map