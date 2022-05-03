export interface IComment {
  id: number,
  content: string,
  createdAt: Date,
  userId: number,
  postId: number,
}

export interface IIncomingComment extends Omit<IComment, 'id'|'createdAt'>{}
