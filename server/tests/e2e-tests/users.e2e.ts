import { server, app } from '../../index';
import { prisma } from '../../prisma/prisma-client';
import request from 'supertest';
import { IIncomingUser } from '../../interfaces/user.interface';

export const userTests = (): void => {
  const MOCK_USER_INCOMING: IIncomingUser = {
    email: ' test@test.com',
    emailVerified: false,
    username: 'testUsername',
    pictureUrl: '/fakeImageUrl.png',
    sub: 'subText'
  };

  describe('Testing Post user to the /user route', () => {
    afterEach(async () => {
      await prisma.user.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });

    it('Should post a user to the database, return a 201 status, and the new entry', async () => {
      const postUser: any = await request(app)
        .post('/users')
        .send(MOCK_USER_INCOMING);

      const getResponse: any = await prisma.user.findFirst({
        where: {
          username: postUser.username
        }
      });
      expect(getResponse.email).toEqual(MOCK_USER_INCOMING.email); // Check to make sure the database saved the right data
      expect(postUser.status).toEqual(201); // Check to make sure the status code is correct
      expect(typeof postUser.body.id).toEqual('number');// Check to make sure a number id was added
      expect(postUser.body.email).toEqual(MOCK_USER_INCOMING.email);// Check to make sure the right data is return to frontend after post
    });

    it('Should handle failed post a user to the database, return 500 status, and send an error message', async () => {
      const postUser: any = await request(app)
        .post('/users')
        .send({});

      const getResponse: any = await prisma.user.findFirst({
        where: {
          username: postUser.username
        }
      });
      console.log(postUser.body);
      expect(getResponse).toEqual(null); // Check to make sure the database saved the right data
      expect(postUser.status).toEqual(500); // Check to make sure the status code is correct
      expect(postUser.body).toEqual({ error: 'A database error has occurred.' });// Check to make sure the right error message is returned
    });
  });
};
