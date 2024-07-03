import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://batchapi.fashionandstyle.com:8020/api/v1', // 기본 URL 설정
  headers: {
    // 'Content-Type': 'application/json',
    'system-key': '23009A6381E37EE7F041E0FE5483D33652201022A00D14AC3A454F6665548142'
  },
});

export default AxiosInstance;