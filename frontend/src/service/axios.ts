import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001", 
    headers: {
        'Content-Type': 'application/json',
      },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 404) {
            console.warn("No application found (handled by interceptor).");
            return Promise.resolve({ data: null }); // Trả về dữ liệu mặc định
        }
        return Promise.reject(error); // Ném lỗi khác
    }
);

export default instance;