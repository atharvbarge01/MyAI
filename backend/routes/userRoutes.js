import express from 'express';
import { getUserCreations, toggleLikeCreations } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth , getUserCreations)
userRouter.post('/toggle-like-creations', auth , toggleLikeCreations)

export default userRouter;