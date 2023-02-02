import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateHistoryDto } from './dto/create-history.dto';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
    }>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").User[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    update(id: string, payload: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<import(".prisma/client").User, never>;
    createHistory(createHistoryDto: CreateHistoryDto): Promise<void>;
    findHistoriesByUserId(userId: string): Promise<import(".prisma/client").Prisma.JsonValue[]>;
    getStats(userId: string): Promise<{
        stock: string;
        times_requested: number;
    }[]>;
    private validateNewUserData;
    private validateNewHistoryData;
    private mapStats;
}
