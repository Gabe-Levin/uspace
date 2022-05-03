export interface IPost {
  id: number,
  title: string,
  tags: string,
  createdAt: Date,
  content: string,
  userId: number,
  spaceId: number,
}

export interface IIncomingPost extends Omit<IPost, 'id'|'createdAt'> {}
