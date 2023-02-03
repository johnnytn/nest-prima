import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private logger;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
    resetPassword(email: string): Promise<{
        message: string;
        password: string;
    }>;
}
