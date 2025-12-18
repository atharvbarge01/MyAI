import { Hash, HashIcon, Image, ImageIcon, PaperclipIcon, PenBoxIcon, FileTextIcon, ScissorsIcon } from "lucide-react";
import logo from "./logo.svg"

export const assets={
    logo,
};


export const tools =[
    {
        title: "Create Blog",
        description: "Generate engaging and well-structured blog posts instantly with AI.",
        Icon: Hash,
        bgColor: "bg-gradient-to-r from-blue-100 via-white to-indigo-100",
        path: "/MyAI/Create-Blog",
    },
    {
        title:"Create Article",
        description:"Generate a detailed article based on the given topic with our AI",
        Icon:PenBoxIcon,
        bgColor:"bg-gradient-to-r from-cyan-100 via-white to-blue-100",
        path:'/MyAI/Create-Article'
    },
    {
        title: "Generate Image",
        description: "Turn your text prompts into stunning AI-generated images instantly.",
        Icon: ImageIcon,
        bgColor: "bg-gradient-to-r from-pink-100 via-white to-purple-100",
        path: "/MyAI/Generate-Image",
    },
    {
        title: "Resume Analysis",
    description: "Upload your resume and get instant AI-powered feedback and insights.",
    Icon: FileTextIcon,
    bgColor: "bg-gradient-to-r from-yellow-100 via-white to-orange-100",
    path: "/MyAI/Resume-Analysis",
    },
    {
        title: "Remove Background",
        description: "Easily remove or replace image backgrounds with AI precision.",
        Icon: ScissorsIcon,
        bgColor: "bg-gradient-to-r from-green-100 via-white to-emerald-100",
        path: "/MyAI/Remove-Background",
    },

]