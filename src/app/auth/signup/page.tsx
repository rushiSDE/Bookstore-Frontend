"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

import '../login/page.css';
import Swal from "sweetalert2";


export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation before calling the API
    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const response = await authService.signup(username, email, password);
  
      if (response.success) {
        // SweetAlert2 for signup success
        Swal.fire({
          title: "Signup Successful!",
          text: "Your account has been created. Please log in.",
          icon: "success",
          confirmButtonText: "Proceed to Login",
          customClass: {
            confirmButton: "custom-confirm-btnnn", // Add custom class
          },
        }).then(() => {
          // Redirect to the login page after success
          router.push("/auth/login");
        });
      } else {
        // SweetAlert2 for signup failure
        Swal.fire({
          title: "Signup Failed",
          text: response.message || "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
  
      // SweetAlert2 for error during signup
      Swal.fire({
        title: "Error",
        text: "An error occurred during signup. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

  };

  return (
    <div className="boddy">
  
    <div className="login-container">
    <div className="login-header">
        <h1>Signup</h1>
        <p>Please enter your credentials to Signup</p>
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
                onChange={(e) => setUsername(e.target.value)}
                />
            {/* <span className="error-message" id="emailError"></span> */}
        </div>

        <div className="form-group">
            <label htmlFor="text">Email</label>
            <input 
                type="text" 
                id="email" 
                name="Email" 
                required 
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="login-button">Signup</button>
    </form>
    <div className="additional-options">
        <br></br>
        <span> Already have an account? </span>
        <a href="/auth/login" className="text-blue-600 hover:underline">
             Login
        </a>
    </div>
</div>
                </div>
  );
}
