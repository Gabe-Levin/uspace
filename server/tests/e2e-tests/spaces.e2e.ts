import { server, app } from '../../index';
import { prisma } from '../../prisma/prisma-client';
import request from 'supertest';
import { IIncomingSpace } from '../../interfaces/space.interface';

export const spaceTests = (): void => {
  const MOCK_SPACE_INCOMING: IIncomingSpace = {
    name: 'Space_Name',
    description: 'This is a test description'
  };

  describe('Testing Post /Spaces', () => {
    afterEach(async () => {
      await prisma.space.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });

    it('Should post a space to the database, return a 201 status and the new entry', async () => {
      const postSpace: any = await request(app)
        .post('/spaces')
        .send(MOCK_SPACE_INCOMING);

      const getResponse: any = await prisma.space.findFirst({
        where: {
          name: MOCK_SPACE_INCOMING.name
        }
      });

      expect(getResponse.description).toEqual(MOCK_SPACE_INCOMING.description); // Check to make sure the database saved the right data
      expect(postSpace.status).toEqual(201); // Check to make sure the status code is correct
      expect(typeof postSpace.body.id).toEqual('number');// Check to make sure a number id was added
      expect(postSpace.body.name).toEqual(MOCK_SPACE_INCOMING.name);// Check to make sure the right data is return to frontend after post
    });

    it('Should handle failed post a Space to the database, return 500 status, and send an error message', async () => {
      const postSpace: any = await request(app)
        .post('/spaces')
        .send({});

      const getResponse: any = await prisma.space.findFirst({
        where: {
          name: MOCK_SPACE_INCOMING.name
        }
      });
      expect(getResponse).toEqual(null); // Check to make sure the database saved the right data
      expect(postSpace.status).toEqual(500); // Check to make sure the status code is correct
      expect(postSpace.body).toEqual({ error: 'A database error has occurred.' });// Check to make sure the right error message is returned
    });
  });

  describe('Testing Delete /Spaces', () => {
    let MOCK_ID: number;
    beforeEach(async () => {
      await prisma.space.create(
        { data: MOCK_SPACE_INCOMING }
      );
      const newEntry:any = await prisma.space.findFirst({
        where: {
          name: MOCK_SPACE_INCOMING.name
        }
      });
      MOCK_ID = newEntry.id;
    });
    afterEach(async () => {
      await prisma.space.deleteMany();
    });
    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });

    it('Should delete a space in the database, return a 202 status and deleted entry id entry', async () => {
      const postSpace: any = await request(app)
        .delete(`/spaces/${MOCK_ID}`);

      const getResponse: any = await prisma.space.findFirst({
        where: {
          id: MOCK_ID
        }
      });

      expect(getResponse).toEqual(null); // Check to make sure the database no longer holds the given entry
      expect(postSpace.status).toEqual(202); // Check to make sure the status code is correct
      expect(postSpace.body.id).toEqual(MOCK_ID);// Check to make sure the right data is return to frontend after post
    });

    it('Should handle failed delete space requests, return a 500 status and send an error message', async () => {
      const postSpace: any = await request(app)
        .delete('/spaces/WRONG_ID');

      const getResponse: any = await prisma.space.findFirst({
        where: {
          id: MOCK_ID
        }
      });

      expect(getResponse.name).toEqual(MOCK_SPACE_INCOMING.name); // Check to make sure the database no longer holds the given entry
      expect(postSpace.status).toEqual(500); // Check to make sure the status code is correct
      expect(postSpace.body).toEqual({ error: 'A database error has occurred.' });// Check to make sure the right data is return to frontend after post
    });
  });
};
