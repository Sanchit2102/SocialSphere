import express from 'express';
import { deleteUser, followUser,  getAllUsers, getUser, unfollowUser, updateUser } from '../Controllers/UserController.js';
import { authMiddleware } from '../Middleware/authMiddleware.js';
const router  = express.Router();

router.get('/all', getAllUsers); // Match /user/all
router.get('/:id', getUser); // Match /user/:id
router.put('/:id',authMiddleware,updateUser);
router.delete('/:id',authMiddleware,deleteUser);
router.put('/follow/:id',authMiddleware,followUser);
router.put('/unfollow/:id',authMiddleware,unfollowUser);
export default router;