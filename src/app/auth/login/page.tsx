"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // import next/link for navigation
import { authService } from "@/services/authService";

import 'C:/Users/admin/Desktop/Book Mangement/newfrontend/src/app/auth/login/page.css';
import Swal from "sweetalert2";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Using authService to call login API
      const response = await authService.login(username, password);
  
      if (response.success && response.data.accessToken) {
        // SweetAlert2 for successful login
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "Go to Homepage",
        }).then(() => {
          localStorage.setItem("token", response.data.accessToken); // Store token in localStorage
          router.push("/dashboard"); // Navigate to dashboard
        });
      } else {
        // SweetAlert2 for login failure
        Swal.fire({
          title: "Login Failed",
          text: response.message || "Invalid username or password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error: any) {
      console.error("Login failed", error);
  
      // SweetAlert2 for API error
      Swal.fire({
        title: "Error",
        text: "Login failed. Please check your credentials and try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }





  };

  return (
<div className="boddy">
  
    <div className="login-container">
    <div className="login-header">
        <h1>Welcome Back</h1>
        <p>Please enter your credentials to login</p>
    </div>
    <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="text">Username</label>
            <input 
                type="text" 
                id="email" 
                name="text" 
                required 
                placeholder="Enter your Username"
                onChange={(e) => setusername(e.target.value)}
                />
            {/* <span className="error-message" id="emailError"></span> */}
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                />
            <span className="error-message" id="passwordError"></span>
        </div>
        <button type="submit" className="login-button">Login</button>
    </form>
    <div className="additional-options">
        <br></br>
        <span>Don't have an account? </span>
        <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Signup
         </Link>
    </div>
</div>
                </div>
  );
}
