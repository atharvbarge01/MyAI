import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app =express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

await connectCloudinary();

app.get('/',(req,res)=>res.send('API is running...'));
// app.use(requireAuth())

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)); 