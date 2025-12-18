import express from 'express';
import { auth } from '../middlewares/auth.js';
import { generateArticle } from '../controllers/aiController.js';
const aiRouter  = express.Router();

aiRouter.post('/Create-Article', auth, generateArticle);
export default aiRouter;