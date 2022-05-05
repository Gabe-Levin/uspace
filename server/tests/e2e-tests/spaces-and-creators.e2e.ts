import { prisma } from '../../prisma/prisma-client';
import { app, server } from '../../index';
import { addMockUserSpaceRole } from './helpers';
import request from 'supertest';
export const spacesAndCreatorsTests = (): void => {
  describe('GET /spaceAndCreators', () => {
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
    it('Should get all spaces and creators', async () => {
      await addMockUserSpaceRole();
      const { body } = await request(app)
        .get('/spacesAndCreators')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body.length).toBe(1);
    });

    it('Should get all spaces and creators', async () => {
      const { body } = await request(app)
        .get('/spacesAndCreators')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(body.length).toBe(0);
    });
  });
};
