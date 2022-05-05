import { prisma } from '../../prisma/prisma-client';
import { app, server } from '../../index';
import request from 'supertest';
import { IIncomingPost, IPost } from '../../interfaces/post.interface';
import { addMockPost, addMockSpace, addMockUser } from './helpers';
export const postsTests = (): void => {
  describe('POST /posts', () => {
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
    it('Should add a post to the database.', async () => {
      const _mockUser = await addMockUser();
      const _mockSpace = await addMockSpace();
      const MOCK_REQ: IIncomingPost = {
        title: 'Example Post',
        tags: 'Tags',
        content: 'Example Content For a Post',
        userId: _mockUser.id,
        spaceId: _mockSpace.id
      };
      const MOCK_RES: IPost = {
        ...MOCK_REQ,
        id: 0,
        createdAt: new Date()
      };
      const { body: post } = await request(app)
        .post('/posts')
        .expect('Content-Type', /json/)
        .send(MOCK_REQ)
        .expect(201);
      const dbEntry = await prisma.post.findUnique({ where: { id: post.id } });
      expect(dbEntry?.space_id).toBe(_mockSpace.id);
      expect(Object.keys(post).sort()).toEqual(Object.keys(MOCK_RES).sort());
    });
    it('Should send error back when something goes wrong.', async () => {
      const { body: post } = await request(app)
        .post('/posts')
        .expect('Content-Type', /json/)
        .send({})
        .expect(500);
      expect(post).toEqual({ error: 'A database error has occurred.' });
    });
  });
  describe('DELETE /posts/:id', () => {
    afterEach(async () => {
      await prisma.user.deleteMany();
      await prisma.space.deleteMany();
      await prisma.post.deleteMany();
    });

    afterAll(async () => {
      await prisma.$disconnect();
      server.close();
    });
    it('Should delete a post from the database.', async () => {
      const _mockPost = await addMockPost();
      const { body } = await request(app)
        .delete(`/posts/${_mockPost.id}`)
        .expect('Content-Type', /json/)
        .expect(202);
      const dbEntry = await prisma.post.findUnique({ where: { id: _mockPost.id } });
      expect(dbEntry).toBe(null);
      expect(body).toEqual({ id: _mockPost.id });
    });
    it('Should send error back when something goes wrong.', async () => {
      const _mockPost = await addMockPost();
      const { body } = await request(app)
        .delete(`/posts/${_mockPost.id + 1}`)
        .expect('Content-Type', /json/)
        .expect(500);
      expect(body).toEqual({ error: 'A database error has occurred.' });
    });
  });
};
