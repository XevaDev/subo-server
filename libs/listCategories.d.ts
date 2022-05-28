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
declare function listCategory(): Promise<category[]>;
export = listCategory;
