import { server, app } from '../../index';
import { prisma } from '../../prisma/prisma-client';
import request from 'supertest';
import { addMockSpace, addMockUser, addMockUserSpaceRole } from './helpers';

export const userSpaceRoleTests = (): void => {
  describe('Post /User-Space-Role', () => {
    afterEach(async () => {
      await prisma.user_Space_Role.deleteMany();
      await prisma.user.deleteMany();
      await prisma.space.deleteMany();
      await prisma.post.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });

    it('Should post a user-space-role to the database, return a 201 status and the new entry', async () => {
      const MOCK_USER = await addMockUser();
      const MOCK_SPACE = await addMockSpace();
      const postSpace: any = await request(app)
        .post('/User_Space_Roles')
        .send({
          userId: MOCK_USER.id,
          spaceId: MOCK_SPACE.id,
          roleId: 2
        });

      const getResponse: any = await prisma.user_Space_Role.findFirst({
        where: {
          user_id: MOCK_USER.id
        }
      });

      expect(getResponse.space_id).toEqual(MOCK_SPACE.id); // Check to make sure the database saved the right data
      expect(postSpace.status).toEqual(201); // Check to make sure the status code is correct
      expect(typeof postSpace.body.id).toEqual('number');// Check to make sure a number id was added
      expect(postSpace.body.userId).toEqual(MOCK_USER.id);// Check to make sure the right data is return to frontend after post
    });

    it('Should handle failed user-space-role post to the database, return 500 status, and send an error message', async () => {
      const MOCK_USER = await addMockUser();
      const postSpace: any = await request(app)
        .post('/User_Space_Roles')
        .send({});

      const getResponse: any = await prisma.user_Space_Role.findFirst({
        where: {
          user_id: MOCK_USER.id
        }
      });
      expect(getResponse).toEqual(null); // Check to make sure the database was not saved
      expect(postSpace.status).toEqual(500); // Check to make sure the status code is correct
      expect(postSpace.body).toEqual({ error: 'An unknown server error has occurred.' });// Check to make sure the right error message is returned
    });
  });

  describe('Delete /User-Space-Roles', () => {
    let MOCK_SPACE_ID: number;
    let MOCK_ID: number;
    beforeEach(async () => {
      const MOCK_USER_SPACE_ROLE = await addMockUserSpaceRole();
      const newEntry:any = await prisma.user_Space_Role.findFirst({
        where: {
          id: MOCK_USER_SPACE_ROLE.id
        }
      });
      MOCK_SPACE_ID = newEntry.space_id;
      MOCK_ID = newEntry.id;
    });
    afterEach(async () => {
      await prisma.user_Space_Role.deleteMany();
      await prisma.user.deleteMany();
      await prisma.space.deleteMany();
      await prisma.post.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });

    it('Should delete a User Space Role in the database, return a 202 status and deleted entry id entry', async () => {
      const postSpace: any = await request(app)
        .delete(`/User_Space_Roles/${MOCK_SPACE_ID}`);

      const getResponse: any = await prisma.user_Space_Role.findUnique({
        where: {
          id: MOCK_ID
        }
      });

      expect(getResponse).toEqual(null); // Check to make sure the database no longer holds the given entry
      expect(postSpace.status).toEqual(202); // Check to make sure the status code is correct
      expect(postSpace.body.count).toEqual(1);// Check to make sure the right data is return to frontend after post
    });

    it('Should handle failed delete space requests, return a 500 status and send an error message', async () => {
      const postSpace: any = await request(app)
        .delete('/User_Space_Roles/WRONG_ID');

      const getResponse: any = await prisma.user_Space_Role.findFirst({
        where: {
          id: MOCK_ID
        }
      });

      expect(getResponse.id).toEqual(MOCK_ID); // Check to make sure the database no longer holds the given entry
      expect(postSpace.status).toEqual(500); // Check to make sure the status code is correct
      expect(postSpace.body).toEqual({ error: 'A database error has occurred.' });// Check to make sure the right error is return to frontend after post
    });
  });
};
