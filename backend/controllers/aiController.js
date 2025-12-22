import OpenAI from "openai";
import sql from "../configs/db.js";
import axios from 'axios';
import FormData from 'form-data';
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const ai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try{
        const userId = req.userId ?? (await req.auth?.())?.userId;
        console.log('generateArticle userId:', userId);
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized: user not authenticated' });
        const { prompt, length } = req.body ?? {};
        if (!prompt) return res.status(400).json({ success: false, message: 'Missing prompt in request body' });
        const plan =req.plan;
        const free_usage = req.free_usage;


        if(plan==='free' && free_usage>=10){
            return res.json({success:false,message:'Free usage limit exceeded'});
        }

        const response = await ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: parseInt(length),
});
console.log("--- Gemini API Response Received ---"); 
const content = response.choices[0].message.content;

await sql `INSERT INTO creations (user_id,  prompt, content,type) VALUES (${userId},  ${prompt}, ${content},'article')`;

res.json({success:true,content});

    }catch(error){
        console.error("Error generating article:", error);
        return res.status(500).json({ success: false, message: "An error occurred: " + error.message });
    
        
        }
    }


export const generateBlog = async (req, res) => {
    try{
        const userId = req.userId ?? (await req.auth?.())?.userId;
        console.log('generateBlog userId:', userId);
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized: user not authenticated' });
        const { prompt } = req.body ?? {};
        if (!prompt) return res.status(400).json({ success: false, message: 'Missing prompt in request body' });
        const plan =req.plan;
        const free_usage = req.free_usage;


        if(plan==='free' && free_usage>=10){
            return res.json({success:false,message:'Free usage limit exceeded'});
        }

        const response = await ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 500,
});
console.log("--- Gemini API Response Received ---"); 
const content = response.choices[0].message.content;

await sql `INSERT INTO creations (user_id,  prompt, content,type) VALUES (${userId},  ${prompt}, ${content},'blog')`;

res.json({success:true,content});

    }catch(error){
        console.error("Error generating article:", error);
        return res.status(500).json({ success: false, message: "An error occurred: " + error.message });
    
        
        }
    }


export const generateImage = async (req, res) => {
    try{
        const userId = req.userId ?? (await req.auth?.())?.userId;
        console.log('generateImage userId:', userId);
        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized: user not authenticated' });
        const { prompt, publish } = req.body ?? {};
        if (!prompt) return res.status(400).json({ success: false, message: 'Missing prompt in request body' });
        const plan =req.plan;
        const free_usage = req.free_usage;


        if(plan==='free' && free_usage>=10){
            return res.json({success:false,message:'Free usage limit exceeded'});
        }

        const formData = new FormData();
        formData.append('prompt', prompt);
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,
                ...formData.getHeaders?.(),
            },
            responseType: 'arraybuffer'
        });

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

        
   const {secure_url} = await cloudinary.uploader.upload(base64Image)

await sql `INSERT INTO creations (user_id,  prompt, content,type,publish) VALUES (${userId},  ${prompt}, ${secure_url},'image',${publish ?? false})`;

res.json({success:true,content:secure_url});

    }catch(error){
        console.error("Error generating article:", error);
        return res.status(500).json({ success: false, message: "An error occurred: " + error.message });
    
        
        }
    }


export const removeBackgroundofImage = async (req, res) => {
    try{
        const{userId}=req.auth();
        const{image}=req.file;
        const plan =req.plan;
        const free_usage = req.free_usage;


        if(plan==='free' && free_usage>=10){
            return res.json({success:false,message:'Free usage limit exceeded'});
        }

       const {secure_url}= await cloudinary.uploader.upload(image.path , {
        transformation:[
            {
                effect: 'background_removal',
                background_removal:'remove the background'
            }
        ]
       })

await sql `INSERT INTO creations (user_id,  prompt, content,type) VALUES (${userId},  "Remove background from image", ${secure_url},'image')`;

res.json({success:true,content});

    }catch(error){
        console.error("Error generating article:", error);
        return res.status(500).json({ success: false, message: "An error occurred: " + error.message });
    
        
        }
    }

export const resumeAnalysis = async (req, res) => {
    try{
        const{userId}=req.auth();
        const resume=req.file;
        const plan =req.plan;
        const free_usage = req.free_usage;


        if(plan==='free' && free_usage>=10){
            return res.json({success:false,message:'Free usage limit exceeded'});
        }

      if(resume.size > 6 * 1024* 1024){
        return res.json({sucess:false, message:"the file exceeds the limit of 6MB"})
      }

      const dataBuffer = fs.readFileSync(resume.path);
      const pdfData =await pdf(dataBuffer);

      

      const prompt =` Analyze the following resume and provide a constructive feedback on its strengths weaknesses and areas for
       improvement. Resume content: ${pdfData.text}`;

       const response = await ai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature: 0.7,
    max_tokens: 500,
});
console.log("--- Gemini API Response Received ---"); 
const content = response.choices[0].message.content;

await sql `INSERT INTO creations (user_id,  prompt, content,type) VALUES (${userId},  "review the uploaded resume", ${content},'resume-analysis')`;

res.json({success:true,content});

    }catch(error){
        console.error("Error generating article:", error);
        return res.status(500).json({ success: false, message: "An error occurred: " + error.message });
    
        
        }
    }