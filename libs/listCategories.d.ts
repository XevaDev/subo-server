declare type category = {
    id: number;
    name: string;
    memberCount: number;
    ownerId: number;
    createdAt: string;
    css?: string;
    description: string;
    icon: string;
};
declare function listCategory(): category[];
export = listCategory;
