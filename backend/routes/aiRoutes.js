import express from 'express';
import { auth } from '../middlewares/auth.js';
import { generateArticle, generateBlog, generateImage, removeBackgroundofImage, resumeAnalysis } from '../controllers/aiController.js';
import { upload } from '../configs/multer.js';
const aiRouter  = express.Router();

aiRouter.post('/Create-Article', auth , generateArticle);
aiRouter.post('/Create-Blog', auth, generateBlog);
aiRouter.post('/Create-Image', auth, generateImage);
aiRouter.post('/Remove-Background', auth, upload.single('image'), removeBackgroundofImage);
aiRouter.post('/Analyse-Resume', auth, upload.single('resume'), resumeAnalysis);

export default aiRouter;