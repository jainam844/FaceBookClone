export interface IMedia {
  mediaName: string;
  mediaType: string;
}

export interface IPost {
  id: number;
  createdAt: string;
  userAvatar: string;
  userName: string;
  writtenText: string;
  userId: number;
  postMediaWithTypes: IMedia[];
}

export class Post implements IPost {
  id: number;
  createdAt: string;
  userAvatar: string;
  userName: string;
  writtenText: string;
  userId: number;
  postMediaWithTypes: IMedia[];

  constructor(init?: IPost) {
    this.id = init?.id ?? 0;
    this.createdAt = init?.createdAt ?? "";
    this.userAvatar = init?.userAvatar ?? "";
    this.userName = init?.userName ?? "";
    this.writtenText = init?.writtenText ?? "";
    this.userId = init?.userId ?? 0;
    this.postMediaWithTypes = init?.postMediaWithTypes ?? [];
  }
}
