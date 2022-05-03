import { postUser, getUserBySub } from './controllers/user.controller';
import { postUserSpaceRole, getSpacesAndCreators, deleteUserSpaceRole } from './controllers/user-space-role.controller';
import { postPost, deletePost } from './controllers/post.controller';
import { postComment } from './controllers/comment.controller';
import { postSpace, getSpaceData, deleteSpace } from './controllers/space.controller';
import { getAllEntries, getSingleEntryById } from './controllers/modular-routes.controller';

import { Router } from 'express';

const router = Router();

//
// '/:table' routes are dynamic and return all entries of a given table
//

// USERS
router.post('/users', postUser);

// SPACES
router.post('/spaces', postSpace);

// POSTS
router.post('/posts', postPost);

// COMMENTS
router.post('/comments', postComment);

// USER_SPACE_ROLE
router.post('/User_Space_Roles', postUserSpaceRole);

// SPACES + CREATORS
router.get('/spacesAndCreators', getSpacesAndCreators);

// SPACE + POSTS
router.get('/spaceData/:id', getSpaceData);

// GET USER BY SUB
router.get('/usersBySub/:sub', getUserBySub);

// MODULAR ROUTES
router.get('/:table', getAllEntries);
router.get('/:table/:id', getSingleEntryById);

// DELETE POST
router.delete('/posts/:id', deletePost);

// DELETE SPACE
router.delete('/spaces/:id', deleteSpace);

// DELETE SPACE BY SPACE ID
router.delete('/User_Space_Roles/:spaceId', deleteUserSpaceRole);

export = router
