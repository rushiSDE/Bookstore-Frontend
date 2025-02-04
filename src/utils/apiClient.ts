// import axios from "axios";

// export const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });


import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Ensure this matches your backend
  headers: {
    "Content-Type": "application/json",
  },
});
