import { apiClient } from "../utils/apiClient";

export const authService = {
  login: async (username: string, password: string) => {
    try {
      const res = await apiClient.post("/users/login", { username, password });
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Invalid credentials" };
    }
  },
  
  signup: async (username: string, email: string, password: string) => {
    try {
      const res = await apiClient.post("/users/signup", { username, email, password });
      return { success: true, data: res.data };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "Signup failed" };
    }
  },
  

  
};
