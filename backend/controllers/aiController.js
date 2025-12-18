import OpenAI from "openai";
import sql from "../configs/db.js";

const ai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req, res) => {
    try{
        const{userId}=req.auth();
        const{prompt,length}=req.body;
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
        const{userId}=req.auth();
        const{prompt}=req.body;
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
        const{userId}=req.auth();
        const{prompt}=req.body;
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