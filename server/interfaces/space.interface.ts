
export interface ISpace{
  id: number,
  name: string,
  description: string,
  createdAt: Date,
}

export interface IIncomingSpace extends Omit<ISpace, 'id'|'createdAt'>{}
