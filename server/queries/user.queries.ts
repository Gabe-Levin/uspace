import { IIncomingUser, IUser } from '../interfaces/user.interface';
import { prisma } from '../prisma/prisma-client';

export const createUserQuery = async (newUserDetails: IIncomingUser): Promise<IUser> => {
  const userData = {
    email: newUserDetails.email,
    picture_url: newUserDetails.pictureUrl,
    username: newUserDetails.username,
    email_verified: newUserDetails.emailVerified ?? false,
    sub: newUserDetails.sub
  };
  const dbUser = await prisma.user.create(
    {
      data: userData
    }
  );
  const user = {
    id: dbUser.id,
    email: dbUser.email,
    username: dbUser.username,
    emailVerified: dbUser.email_verified,
    createdAt: dbUser.created_at,
    pictureUrl: dbUser.picture_url,
    sub: dbUser.sub
  };
  return user;
};

export const findFirstQuery = async (sub: string): Promise<IUser | null> => {
  const dbUser = await prisma.user.findFirst({
    where: {
      sub
    }
  });
  if (!dbUser) {
    return null;
  }
  const user = {
    id: dbUser.id,
    email: dbUser.email,
    username: dbUser.username,
    emailVerified: dbUser.email_verified,
    createdAt: dbUser.created_at,
    pictureUrl: dbUser.picture_url,
    sub: dbUser.sub
  };
  return user;
};
