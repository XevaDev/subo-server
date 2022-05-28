export type user = {
  username: string;
  email: string;
  password: string;
  token?: string;
  avatar: string;
  id?: number;
  bio: string;
  created_at?: Date;
  verified?: boolean;
};

export type category = {
  id?: number;
  name: string;
  memberCount?: number;
  ownerId: number;
  created_at?: string;
  css?: string;
  description?: string;
  icon?: string;
};

export type comment = {
  id: number;
  authorId: number;
  postId: number;
  content: string;
  created_at: string;
  updated_at: string;
  repliedto?: number;
};

export type post = {
  id: number;
  authorId: number;
  categoryId: number;
  title: string;
  text?: string;
  created_at: string;
  updated_at: string;
  comments?: comment[];
  postType:
    | "audio"
    | "video"
    | "text"
    | "image"
    | "link"
    | "quote"
    | "code"
    | "chat"
    | "poll"
    | "file"
    | "article"
    | "event";

  mediaLink?: string;
};
