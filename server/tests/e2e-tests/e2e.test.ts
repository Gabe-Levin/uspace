import { prisma } from '../../prisma/prisma-client';
import { commentsTests } from './comments.e2e';
import { modularRoutesTests } from './modular-route.e2e';
import { postsTests } from './posts.e2e';
import { spaceDataTests } from './space-data.e2e';
import { spacesAndCreatorsTests } from './spaces-and-creators.e2e';
import { spaceTests } from './spaces.e2e';
import { userSpaceRoleTests } from './user-space-role.e2e';
import { usersBySubTests } from './users-by-sub.e2e';
import { userTests } from './users.e2e';

describe('E2E Tests', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user_Space_Role.deleteMany();
    await prisma.space.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.createMany({
      data: [
        { id: 1, name: 'viewer' },
        { id: 2, name: 'creator' }
      ]
    });
  });
  afterAll(async () => {
    await prisma.role.deleteMany();
    await prisma.$disconnect();
  });
  postsTests();
  userTests();
  commentsTests();
  spaceTests();
  modularRoutesTests();
  spacesAndCreatorsTests();
  spaceDataTests();
  usersBySubTests();
  userSpaceRoleTests();
});
