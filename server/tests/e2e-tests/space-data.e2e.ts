import { prisma } from '../../prisma/prisma-client';
import { app, server } from '../../index';
import { addMockSpace } from './helpers';
import request from 'supertest';
export const spaceDataTests = (): void => {
  describe('GET /spaceData/:id', () => {
    afterEach(async () => {
      await prisma.comment.deleteMany();
      await prisma.post.deleteMany();
      await prisma.user_Space_Role.deleteMany();
      await prisma.space.deleteMany();
      await prisma.user.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });
    it('Should get the space data by space id with all properties', async () => {
      const space = await addMockSpace();
      const { body } = await request(app)
        .get(`/spaceData/${space.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(Object.keys(body).sort()).toEqual(['id', 'name', 'description', 'createdAt', 'posts', 'userSpaceRoles'].sort());
    });

    it('Should handle error correctly', async () => {
      const { body } = await request(app)
        .get('/spaceData/1')
        .expect('Content-Type', /json/)
        .expect(404);
      expect(body).toEqual({ error: 'Space has not been found.' });
    });
  });
};
