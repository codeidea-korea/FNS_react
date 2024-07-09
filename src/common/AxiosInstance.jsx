import axios from 'axios';
import React from 'react';

const AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`, // 기본 URL 설정
    headers: {
        'system-key': `${import.meta.env.VITE_SYSTEM_KEY}`
    },
});

export default AxiosInstance;