import React from "react";

export default ({ width = "16", height = "16", fill = "#000" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill="#f0f0f0" />
      <circle
        cx="100"
        cy="100"
        r="80"
        fill={fill}
        stroke="#999"
        strokeWidth="4"
      />

      <circle cx="100" cy="100" r="60" fill="#fff" />
    </svg>
  );
};
