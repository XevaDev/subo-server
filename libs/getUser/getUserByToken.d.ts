declare type user = {
    username: string;
    email?: string;
    password?: string;
    token?: string;
    avatar: string;
    id?: number;
    bio: string;
    created_at: Date;
    verified: boolean;
};
declare function getUserByToken(val: string): Promise<user>;
export = getUserByToken;