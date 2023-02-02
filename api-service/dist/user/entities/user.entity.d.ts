export declare enum RoleType {
    USER = "user",
    ADMIN = "admin"
}
export declare class History {
    id: string;
    userId: string;
    symbol: string;
    metadata: JSON;
}
export declare class User {
    id: string;
    email: string;
    role: RoleType;
    password: string;
}
