export interface IStory {
  avatar: string ;
  stories: IStoryMedia[];
  text: string;
  userId: number;
  userName: string;
  
}

interface IStoryMedia {
  createdAt: string;
  isSeen: boolean;
  path: string;
  storyId: number;
  text: string;
}
