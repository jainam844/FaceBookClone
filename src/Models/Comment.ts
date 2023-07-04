export interface IComment {
    avatar: string;
    commentId: number;
    createdAt: string;
    postId: number;
    text: string;
    userId: number;
    userName: string;
  }
  export class Comment implements IComment {
    avatar: string;
    commentId: number;
    createdAt: string;
    postId: number;
    text: string;
    userId: number;
    userName: string;
  
    constructor(init?: IComment) {
      this.avatar = init?.avatar ?? "";
      this.commentId = init?.commentId ?? 0;
      this.createdAt = init?.createdAt ?? "";
      this.postId = init?.postId ?? 0;
      this.text = init?.text ?? "";
      this.userId = init?.userId ?? 0;
      this.userName = init?.userName ?? "";
    }
  }
  