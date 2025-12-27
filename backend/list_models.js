import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';

dotenv.config();

const listModels = async () => {
    try {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
            console.error('GEMINI_API_KEY not found in .env');
            return;
        }
        console.log('Querying models with key ending in: ...' + key.slice(-4));

        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
            const response = await axios.get(url);
            let output = 'Available Models (v1beta):\n';
            response.data.models.forEach(m => {
                if (m.name.includes('gemini')) {
                    output += `- ${m.name}\n`;
                }
            });
            fs.writeFileSync('models.txt', output);
            console.log('Written to models.txt');
        } catch (error) {
            console.log('v1beta failed:', error.message);
            if (error.response) {
                console.log(JSON.stringify(error.response.data, null, 2));
            }
        }
    } catch (err) {
        console.error('Script failed:', err);
    }
};

listModels();
