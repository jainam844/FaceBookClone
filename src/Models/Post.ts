
export interface Ipost {
    avatar: string;
    createdAt: string;
    path: string[];
    postId: number;
    text: string;
    userId: number;
    userName: string;
    avatarUrl: string | undefined; 
  }
  
  export class PostClass implements Ipost {
    avatar: string;
    createdAt: string;
    path: string[];
    postId: number;
    text: string;
    userId: number;
    userName: string;
    avatarUrl: string | undefined; 
  
    constructor(init?: Ipost) {
      this.postId = init?.postId ?? 0;
      this.createdAt = init?.createdAt ?? "";
      this.avatar = init?.avatar ?? "";
      this.userName = init?.userName ?? "";
      this.text = init?.text ?? "";
      this.userId = init?.userId ?? 0;
      this.path = init?.path ?? [];
      this.avatarUrl = init?.avatarUrl ?? "";
    }
  }
  