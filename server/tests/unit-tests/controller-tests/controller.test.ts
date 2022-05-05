import { commentControllerTests } from './comment.controller';
import { modularRoutesControllerTests } from './modular-routes.controller';
import { postControllerTests } from './post.controller';
import { spaceControllerTests } from './space.controller';
import { userSpaceRoleControllerTests } from './user-space-role.controller';
import { userControllerTests } from './user.controller';
describe('Controller Tests', () => {
  commentControllerTests();
  modularRoutesControllerTests();
  postControllerTests();
  spaceControllerTests();
  userSpaceRoleControllerTests();
  userControllerTests();
});
