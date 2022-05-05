import { prisma } from '../../prisma/prisma-client';
import { app, server } from '../../index';

import request from 'supertest';
import { addMockComment, addMockPost, addMockSpace, addMockUser, addMockUserSpaceRole } from './helpers';
export const modularRoutesTests = (): void => {
  describe('GET /:table', () => {
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

    it('/Comments', async () => {
      await addMockComment();
      const { body: comments } = await request(app)
        .get('/Comments')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(comments.length).toBe(1);
    });

    it('/Posts', async () => {
      await addMockPost();
      const { body: posts } = await request(app)
        .get('/Posts')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(posts.length).toBe(1);
    });

    it('/Spaces', async () => {
      await addMockSpace();
      const { body: spaces } = await request(app)
        .get('/Spaces')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(spaces.length).toBe(1);
    });

    it('/Users', async () => {
      await addMockUser();
      const { body: users } = await request(app)
        .get('/Users')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(users.length).toBe(1);
    });

    it('/Users_Space_Roles', async () => {
      await addMockUserSpaceRole();
      const { body: userSpaceRole } = await request(app)
        .get('/User_Space_Roles')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(userSpaceRole.length).toBe(1);
    });

    it('Should send an empty array if no entries are found', async () => {
      const { body: comments } = await request(app)
        .get('/Comments')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(comments.length).toBe(0);
    });

    it('Should send an error if the route is not one of the accepted routes', async () => {
      const { body } = await request(app)
        .get('/Test')
        .expect('Content-Type', /json/)
        .expect(500);
      expect(body).toEqual({ error: 'A database error has occurred.' });
    });
  });
  describe('GET /:table/:id', () => {
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

    it('/Comments/:id', async () => {
      const dbComment = await addMockComment();
      const { body: comment } = await request(app)
        .get(`/Comments/${dbComment.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(comment.id).toBe(dbComment.id);
    });

    it('/Posts/:id', async () => {
      const dbPost = await addMockPost();
      const { body: post } = await request(app)
        .get(`/Posts/${dbPost.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(post.id).toBe(dbPost.id);
    });

    it('/Spaces/:id', async () => {
      const dbSpace = await addMockSpace();
      const { body: space } = await request(app)
        .get(`/Spaces/${dbSpace.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(space.id).toBe(dbSpace.id);
    });

    it('/Users/:id', async () => {
      const dbUser = await addMockUser();
      const { body: user } = await request(app)
        .get(`/Users/${dbUser.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(user.id).toBe(dbUser.id);
    });

    it('/User_Space_Roles/:id', async () => {
      const dbUserSpaceRole = await addMockUserSpaceRole();
      const { body: userSpaceRole } = await request(app)
        .get(`/User_Space_Roles/${dbUserSpaceRole.id}`)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(userSpaceRole.id).toBe(dbUserSpaceRole.id);
    });

    it('Should send an error if no entry is found', async () => {
      const { body: comment } = await request(app)
        .get('/Comments/1')
        .expect('Content-Type', /json/)
        .expect(500);
      expect(comment).toEqual({ error: 'A database error has occurred.' });
    });

    it('Should send an error if the route is not one of the accepted routes', async () => {
      const { body } = await request(app)
        .get('/Test/1')
        .expect('Content-Type', /json/)
        .expect(500);
      expect(body).toEqual({ error: 'A database error has occurred.' });
    });
  });
};
