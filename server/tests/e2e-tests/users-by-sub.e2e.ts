import { prisma } from '../../prisma/prisma-client';
import { app, server } from '../../index';
import { addMockUser } from './helpers';
import request from 'supertest';
import { IUser } from '../../interfaces/user.interface';
export const usersBySubTests = (): void => {
  describe('GET /usersBySub/:sub', () => {
    afterEach(async () => {
      await prisma.user.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });
    it('Should get the space data by space id with all properties', async () => {
      const user: IUser = await addMockUser();
      const { body } = await request(app)
        .get(`/usersBySub/${user.sub}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(Object.keys(body).sort()).toEqual(Object.keys(user).sort());
    });

    it('Should handle error correctly', async () => {
      const { body } = await request(app)
        .get('/usersBySub/fake')
        .expect('Content-Type', /json/)
        .expect(404);
      expect(body).toEqual({ error: 'User not found.' });
    });
  });
};
