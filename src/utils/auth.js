import { apiRequest } from "./api";
import { clearAuthToken, clearUsername, saveAuthToken } from "./storage";
import CryptoJS from "crypto-js";

// Verify token via apiRequest
export const verifyToken = async (token) => {
  return apiRequest("/verify-token", "POST", { token });
};

export const login = async ({ username, password }) => {
  const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  const response = await apiRequest("/login", "POST", {
    username,
    password: hashedPassword,
  });
  const data = await response.json();
  if (data.status !== "success") throw new Error(data.message);
  saveAuthToken(data.token);
  return true;
};

export const logout = () => {
  clearAuthToken();
  clearUsername();
};

export const register = async ({ name, username, age, email, password }) => {
  const response = await apiRequest("/register", "POST", {
    name,
    username,
    age,
    email,
    password: password,
  });
  const data = await response.json();
  if (data.status !== "success") throw new Error(data.message || "Registration failed");
  return data;
};
