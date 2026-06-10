import React from "react";

function ProductCard({ title, imageUrl, description }) {
  return (
    <div
      style={{
        maxWidth: "320px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <div style={{ padding: "16px" }}>
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: "1.25rem",
            fontWeight: "600",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;