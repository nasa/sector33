import * as React from "react";

const InfoSVG = ({ className = "", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="120 78.514 240 41.501"
        width="100%"
        height="100%"
        className={className}
        {...props}
    >
        <path
            fill="var(--svg-shadow, #166534)"
            stroke="var(--svg-shadow, #166534)"
            strokeWidth="1"
            d="M 120.038 120.015 L 120 80 L 360 80 L 320 120 L 120 120 Z"
        />

        <path
            fill="var(--svg-fill, #22c55e)"
            stroke="var(--svg-fill, #22c55e)"
            fillRule="nonzero"
            d="M 120.038 118.529 L 120 78.514 L 359.272 78.514 L 319.393 118.514 L 120 118.514 Z"
        />
    </svg>

);


export { InfoSVG };
