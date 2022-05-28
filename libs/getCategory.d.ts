declare type category = {
    id: number;
    name: string;
    memberCount: number;
    ownerId: number;
    created_at: string;
    css?: string;
    description: string;
    icon: string;
};
declare function getCategory(id: string): Promise<category>;
export = getCategory;
