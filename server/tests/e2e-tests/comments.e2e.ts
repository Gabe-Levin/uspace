import { prisma } from '../../prisma/prisma-client';
import { app, server } from '../../index';

import request from 'supertest';
import { addMockPost } from './helpers';
import { IComment, IIncomingComment } from '../../interfaces/comment.interface';
export const commentsTests = (): void => {
  describe('POST /comments', () => {
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
    it('Should add a comment to the database.', async () => {
      const _mockPost = await addMockPost();
      const MOCK_REQ: IIncomingComment = {
        content: 'Mock Comment',
        userId: _mockPost.userId,
        postId: _mockPost.id
      };
      const MOCK_RES: IComment = {
        ...MOCK_REQ,
        id: 0,
        createdAt: new Date()
      };
      const { body: comment } = await request(app)
        .post('/comments')
        .expect('Content-Type', /json/)
        .send(MOCK_REQ)
        .expect(201);
      const dbEntry = await prisma.comment.findUnique({ where: { id: comment.id } });
      expect(dbEntry?.post_id).toBe(_mockPost.id);
      expect(Object.keys(comment).sort()).toEqual(Object.keys(MOCK_RES).sort());
    });

    it('Should send error back when something goes wrong.', async () => {
      const { body: post } = await request(app)
        .post('/comments')
        .expect('Content-Type', /json/)
        .send({})
        .expect(500);
      expect(post).toEqual({ error: 'A database error has occurred.' });
    });
  });
};
