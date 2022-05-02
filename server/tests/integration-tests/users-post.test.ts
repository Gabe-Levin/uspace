import request from 'supertest';

import { app, server } from '../../index';
import { IIncomingUser } from '../../interfaces/user.interface';
import { prisma } from '../../prisma/prisma-client';
describe('Integration tests', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    server.close();
  });

  test('POST /users', (done) => {
    const MOCK_REQ: IIncomingUser = { email: 'tes@test.com', emailVerified: true, username: 'Stefan', pictureUrl: './image.png', sub: 'sub text' };
    request(app)
      .post('/users')
      .expect('Content-Type', /json/)
      .send(MOCK_REQ)
      .expect(201).end(done)
    ;
  });
});
