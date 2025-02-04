"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import "../orders/page.css"; // Import external CSS for styling
import Swal from "sweetalert2";

export default function Details() {
  const searchParams = useSearchParams();

  // Retrieve query parameters
  const bookId = searchParams.get("bookId");
  const title = searchParams.get("title");
  const author = searchParams.get("author");
  const price = searchParams.get("price");
  const image = searchParams.get("image");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState(""); // State for mobile number

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !address.trim() || !pinCode.trim() || !mobileNumber.trim()) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    if (pinCode.length !== 6 || isNaN(Number(pinCode))) {
      Swal.fire("Error", "Please enter a valid 6-digit pin code.", "error");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      Swal.fire("Error", "Please enter a valid 10-digit mobile number.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/orderbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          title,
          name,
          author,
          address,
          pinCode,
          mobileNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save details");
      }

      // Show success message with SweetAlert2
      Swal.fire({
        title: "Success!",
        text: "Details saved successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Use window.location to navigate to the dashboard
        window.location.href = "/dashboard"; // Navigate to the dashboard
      });

      // Clear the form fields
      setName("");
      setAddress("");
      setPinCode("");
      setMobileNumber("");
    } catch (error: any) {
      Swal.fire("Error", error.message || "An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="bodyyyy">
      <div className="details-container">
        <h1>Order Details</h1>
        <div className="book-info">
          <img
            src={image || "https://via.placeholder.com/150"}
            alt={title || "Book"}
            className="book-image"
          />
          <div className="book-details">
            <h2>{title || "Untitled Book"}</h2>
            <p>Author: {author || "Unknown Author"}</p>
            <p>Price: &#8377;{price || "0"}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="details-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter your address here..."
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
              placeholder="Enter your pin code..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              placeholder="Enter your mobile number..."
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
}
