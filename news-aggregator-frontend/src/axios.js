import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Your backend base URL
    withCredentials: true, // Send cookies with each request
});

axiosInstance.interceptors.request.use(async (config) => {
    const xsrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN'));
    const token = Cookies.get('auth_token');;
    if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = xsrfToken.split('=')[1];
    }
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
