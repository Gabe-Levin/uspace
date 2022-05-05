import { commentModelTests } from './comment.model';
import { modularRoutesModelTests } from './modular-routes.model';
import { postModelTests } from './post.model';
import { spaceModelTests } from './space.model';
import { userSpaceRoleModelTests } from './user-space-role.model';
import { userModelTests } from './user.model';

describe('Model Tests', () => {
  commentModelTests();
  modularRoutesModelTests();
  postModelTests();
  spaceModelTests();
  userSpaceRoleModelTests();
  userModelTests();
});
