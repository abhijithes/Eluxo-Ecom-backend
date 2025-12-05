import api from "./axios";

export const login = async ({ email, password }) => {
    try {
        const res = await api.post("/user/login", { email, password });
        return { data: res.data, status: res.status };
    } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        alert(message);
        throw new Error(message);
    }
};

export const signup = async ({ name, email, password }) => {
    try {
        const res = await api.post("/user/register", { name, email, password });
        return { data: res.data, status: res.status };
    } catch (error) {
        const message = error.response?.data?.message || "Signup failed";
        alert(message);
        throw new Error(message);
    }
};
