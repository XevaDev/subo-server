declare type user = {
    username: string;
    email: string;
    password: string;
    token?: string;
    avatar: string;
    id?: number;
    bio: string;
    createdAt?: Date;
    verified?: boolean;
};
declare function createAccount(user: user): void;
export = createAccount;
