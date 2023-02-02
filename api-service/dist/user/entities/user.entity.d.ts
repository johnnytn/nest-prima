export declare enum RoleType {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    email: string;
    role: RoleType;
    password: string;
}
