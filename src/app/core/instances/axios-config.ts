// axios-config.ts
import axios from 'axios';
import { environment } from '../../../environments/environment';

// Function to retrieve CSRF token from meta tag
function getCSRFToken(): string | null {
    const metaTag: HTMLMetaElement | null = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.content : null;
}

const axiosInstance = axios.create({
    baseURL: environment.api_url,
    withCredentials: true,
});

// Add request interceptor
axiosInstance.interceptors.request.use(config => {
    // Add CSRF token to headers
    const csrfToken = getCSRFToken();
    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Add response interceptor
axiosInstance.interceptors.response.use(response => {
    // Handle response data
    return response;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
