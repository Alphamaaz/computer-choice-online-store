import React from "react";
import QuickFilters from "../Components/Homepage/QuickFilters";
import BestSeller from "../Components/BestSeller";
import Footer from "../Components/Footer";

function Laptops() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          margin: "0 auto",
          padding: "20px 40px",
          fontSize: "2.5rem",
          fontWeight: "600",
          color: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          borderLeft: "5px solid #3498db",
          textTransform: "capitalize",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          letterSpacing: "1px",
          transform: "perspective(500px)",
          transition: "all 0.3s ease",
          cursor: "default",
          width: "fit-content",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          ":hover": {
            transform: "perspective(500px) translateZ(10px)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            color: "#2980b9",
          },
        }}
      >
        Find Best Quality Laptops
      </h1>
      <QuickFilters />
      <BestSeller />
      <Footer />
    </div>
  );
}

export default Laptops;
