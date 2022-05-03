export interface IUserSpaceRole {
  id: number,
  userId: number,
  spaceId: number,
  roleId: number,
}

export interface IIncomingUserSpaceRole extends Omit<IUserSpaceRole, 'id'> {}
