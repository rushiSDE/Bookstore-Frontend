"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import '../dashboard/style.css';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
// Define the TypeScript interface for the item object
interface BookItem {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
}



// Cards Component


// Dashboard Component
export default function Dashboard() {
  
  const [books, setBooks] = useState<BookItem[]>([]); // State to store books data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  
  useEffect(() => {
    // Fetch books data
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        setBooks(books); // Update state with fetched data
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Something went wrong");
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
// Function to truncate book title and add "..." for long titles
const truncateTitle = (title: string, length: number = 20) => {
  return title.length > length ? title.substring(0, length) + "..." : title;
};


const router = useRouter();

const handleLogout = () => {
  // Show SweetAlert2 confirmation dialog before logout
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, logout",
    cancelButtonText: "Cancel",
    customClass: {
      confirmButton: "custom-confirm-btn", // Add custom class to confirm button
      cancelButton: "custom-cancel-btn",  // Add custom class to cancel button
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Remove the token from localStorage
      localStorage.removeItem('userToken');

      // Show a success message
      Swal.fire({
        title: "Logged out!",
        text: "You have been successfully logged out.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Redirect to the login page
        router.push('/auth/login');
      });
    }
  });
};
  

  return (
    <>

<div>
<nav className="navbar">
  <div className="logo">
    <a href="#">BookStore</a>
  </div>
  <ul className="nav-links">
  <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </ul>
</nav>


      {/* Cards Grid */}
      <div className="card-grid">
        {books.map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-image">
              <img
                src={item.image || "placeholder.jpg"}
                alt={item.title || "Product Name"}
              />
            </div>
            <div className="product-details">
              <h2 className="product-title">{truncateTitle(item.title)}</h2>
              <p className="product-category">{item.author}</p>
              <div className="price">
                <span className="price-new">&#8377;{item.price}</span>
              </div>
              {/* <Link href="/orders" className="text-blue-600 hover:underline"> */}
             <Link
  href={{
    pathname: "/orders", // Navigate to the details page
    query: {
      bookId: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      image: item.image,
    },
  }}
>
              <button className="add-to-cart-btn">Add to Cart</button>
         </Link>
            </div>
          </div>
        ))}
      </div>
    </div>


      
    </>
  );
}




