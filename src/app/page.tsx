
"use client";
import { BrowserRouter , Route,Routes} from 'react-router-dom';
import Link from "next/link";
import Page from "./auth/login/page";
// import Signup from './auth/signup';

export default function Home() {
  return (
    <BrowserRouter>
    <Routes>
      
    <Route path="/" element={<Page/> } /> 
      
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}

     

    </Routes>
</BrowserRouter>

  );
}
