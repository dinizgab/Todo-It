import axios from "axios";

export const api = axios.create({
    baseURL: "todo-it-backend.up.railway.app",
    withCredentials: true
})