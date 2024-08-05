import axios from 'axios';
import React from 'react';

const AxiosInstance = axios.create({
    // baseURL: `${import.meta.env.VITE_DEV_API_URL}`, // 개발 API SERVER
    baseURL: `${import.meta.env.VITE_PROD_API_URL}`, // 운영 API SERVER
    headers: {
        'system-key': `${import.meta.env.VITE_SYSTEM_KEY}`
    },
});

export default AxiosInstance;