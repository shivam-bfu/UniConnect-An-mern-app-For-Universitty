import axios from 'axios';

const api = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",

});

export const executeCode = async (sourceCode) => {
    try {
        const response = await api.post('/execute', {
            language: 'javascript',  
            version: "18.15.0",     
            files: [
                {
                    name: 'index.js',  
                    content: sourceCode,
                }
            ]
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('API Error Data:', error.response.data);
            console.error('API Error Status:', error.response.status);
            throw new Error(error.response.data.message || 'Failed to execute code');
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('No response received from the server');
        } else {
            console.error('Request setup error:', error.message);
            throw error;
        }
    }
};