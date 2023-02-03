import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UserService } from './user/user.service';
export declare class AppController {
    private readonly appService;
    private readonly userService;
    private readonly authService;
    constructor(appService: AppService, userService: UserService, authService: AuthService);
    getHello(): string;
    registerUser(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
    }>;
    getHistories(req: any): Promise<import(".prisma/client").Prisma.JsonValue[]>;
    getStats(): Promise<{
        stock: string;
        times_requested: number;
    }[]>;
    resetPassword(email: string): Promise<{
        message: string;
        password: string;
    }>;
}
