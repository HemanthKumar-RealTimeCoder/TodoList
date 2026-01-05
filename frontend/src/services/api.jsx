import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);

// 🔹 ENHANCED TODO SERVICES
export const fetchTodos = (page = 1, limit = 5, search = "") => {
  let url = `/todos?page=${page}&limit=${limit}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  return API.get(url);
};

export const createTodo = (data) => API.post("/todos", data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);